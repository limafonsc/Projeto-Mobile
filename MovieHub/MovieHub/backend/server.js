const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const mysql = require('mysql2/promise');

loadEnv();
const config = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'moviehub',
  jwtSecret: process.env.JWT_SECRET || '',
  apiPort: Number(process.env.API_PORT || 3333),
  publicApiUrl: (process.env.PUBLIC_API_URL || '').replace(/\/$/, ''),
};
const uploadDirectory = path.join(__dirname, 'uploads');
const pool = config.jwtSecret ? mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  timezone: 'Z',
}) : null;

function loadEnv() {
  const fsSync = require('node:fs');
  const envPath = path.join(__dirname, '.env');
  if (!fsSync.existsSync(envPath)) return;
  for (const line of fsSync.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || Object.prototype.hasOwnProperty.call(process.env, match[1])) continue;
    process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, '$2');
  }
}

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function send(response, status, payload, extraHeaders = {}) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    ...extraHeaders,
  });
  response.end(status === 204 ? undefined : JSON.stringify(payload));
}

async function readJson(request, maxBytes = 1024 * 1024) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > maxBytes) throw new HttpError(413, 'A solicitação excede o limite permitido.');
  }
  if (!body) return {};
  try { return JSON.parse(body); } catch { throw new HttpError(400, 'JSON inválido.'); }
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function createToken(user) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = encodeBase64Url(JSON.stringify({ sub: user.id, email: user.email, iat: now, exp: now + 7 * 24 * 60 * 60 }));
  const unsigned = header + '.' + payload;
  const signature = crypto.createHmac('sha256', config.jwtSecret).update(unsigned).digest('base64url');
  return unsigned + '.' + signature;
}

function verifyToken(request) {
  const match = (request.headers.authorization || '').match(/^Bearer\s+(.+)$/i);
  if (!match) throw new HttpError(401, 'Faça login para continuar.');
  const parts = match[1].split('.');
  if (parts.length !== 3) throw new HttpError(401, 'Sessão inválida. Entre novamente.');
  const expected = crypto.createHmac('sha256', config.jwtSecret).update(parts[0] + '.' + parts[1]).digest();
  let actual;
  try { actual = Buffer.from(parts[2], 'base64url'); } catch { throw new HttpError(401, 'Sessão inválida. Entre novamente.'); }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) throw new HttpError(401, 'Sessão inválida. Entre novamente.');
  let payload;
  try { payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')); } catch { throw new HttpError(401, 'Sessão inválida. Entre novamente.'); }
  if (!payload.sub || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) throw new HttpError(401, 'Sessão expirada. Entre novamente.');
  return { id: payload.sub, email: payload.email };
}

function profileView(user) {
  return { id: user.id, nome: user.nome, email: user.email, foto_url: user.foto_url || null };
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash, encoded: salt + ':' + hash };
}

function verifyPassword(password, encoded) {
  const [salt, storedHex] = String(encoded || '').split(':');
  if (!salt || !storedHex) return false;
  const actual = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHex, 'hex');
  return actual.length === stored.length && crypto.timingSafeEqual(actual, stored);
}

function mapMovie(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year,
    director: row.director,
    duration: row.duration,
    rating: row.rating == null ? null : Number(row.rating),
    status: row.status,
    favorite: Boolean(row.favorite),
    image_url: row.image_url,
    trailer_url: row.trailer_url,
    genre_id: row.genre_id,
    genre: row.genre || null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function movieInput(body, partial = false) {
  const fields = {
    titulo: 'title', title: 'title', descricao: 'description', description: 'description',
    ano: 'year', year: 'year', diretor: 'director', director: 'director',
    duracao: 'duration', duration: 'duration', nota: 'rating', rating: 'rating',
    status: 'status', favoritado: 'favorite', favorite: 'favorite',
    imagem_url: 'image_url', image_url: 'image_url', trailer_url: 'trailer_url',
  };
  const output = {};
  for (const [source, target] of Object.entries(fields)) {
    if (Object.prototype.hasOwnProperty.call(body, source)) output[target] = body[source];
  }
  const genre = body.genero !== undefined ? body.genero : body.genre;
  if (genre !== undefined) output.genre_name = genre;
  if (!partial) {
    if (!String(output.title || '').trim()) throw new HttpError(400, 'Informe o título do filme.');
    if (!Number.isInteger(Number(output.year)) || Number(output.year) < 1888 || Number(output.year) > 2200) throw new HttpError(400, 'Informe um ano válido.');
    if (!String(output.status || '').trim()) throw new HttpError(400, 'Informe o status do filme.');
    if (output.genre_name === undefined || !String(output.genre_name).trim()) throw new HttpError(400, 'Informe o gênero do filme.');
  }
  if (output.year !== undefined) output.year = Number(output.year);
  if (output.duration !== undefined) output.duration = output.duration === '' || output.duration === null ? null : Number(output.duration);
  if (output.rating !== undefined) output.rating = output.rating === '' || output.rating === null ? null : Number(output.rating);
  if (output.favorite !== undefined) output.favorite = Boolean(output.favorite);
  if (output.title !== undefined) output.title = String(output.title).trim();
  if (output.status !== undefined) output.status = String(output.status).trim();
  if (output.rating != null && (output.rating < 0 || output.rating > 5)) throw new HttpError(400, 'A nota deve ficar entre 0 e 5.');
  if (output.duration != null && (!Number.isInteger(output.duration) || output.duration <= 0)) throw new HttpError(400, 'A duração deve ser informada em minutos.');
  return output;
}

async function resolveGenre(name) {
  const [rows] = await pool.execute('SELECT id FROM genres WHERE nome = ?', [String(name).trim()]);
  if (!rows[0]) throw new HttpError(400, 'Gênero não encontrado. Consulte GET /api/genres.');
  return rows[0].id;
}

async function findMovie(id, userId) {
  const [rows] = await pool.execute(
    'SELECT m.*, g.nome AS genre FROM movies m LEFT JOIN genres g ON g.id = m.genre_id WHERE m.id = ? AND m.user_id = ? LIMIT 1',
    [id, userId],
  );
  return rows[0] || null;
}

async function handle(request, response) {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  const url = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';

  const imageMatch = pathname.match(/^\/uploads\/([0-9a-f-]{36}\.(?:jpg|png|webp))$/i);
  if (request.method === 'GET' && imageMatch) {
    try {
      const content = await fs.readFile(path.join(uploadDirectory, imageMatch[1]));
      const ext = path.extname(imageMatch[1]).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      response.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000' });
      return response.end(content);
    } catch { throw new HttpError(404, 'Imagem não encontrada.'); }
  }

  if (pathname === '/api/health' && request.method === 'GET') {
    if (!pool) return send(response, 503, { status: 'configuração pendente', service: 'MovieHub API' });
    try { await pool.query('SELECT 1'); return send(response, 200, { status: 'ok', database: 'mysql', service: 'MovieHub API' }); }
    catch { return send(response, 503, { status: 'indisponível', database: 'mysql', service: 'MovieHub API' }); }
  }
  if (!pool) throw new HttpError(503, 'Configure MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD e JWT_SECRET em backend/.env.');

  if (pathname === '/api/auth/register' && request.method === 'POST') {
    const body = await readJson(request);
    const nome = String(body.nome || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const senha = String(body.senha || '');
    if (!nome || nome.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150 || senha.length < 6) {
      throw new HttpError(400, 'Informe nome, e-mail válido e senha com pelo menos 6 caracteres.');
    }
    const user = { id: crypto.randomUUID(), nome, email, foto_url: body.foto_url || null };
    const password = hashPassword(senha);
    try {
      await pool.execute('INSERT INTO users (id, nome, email, password_hash, foto_url) VALUES (?, ?, ?, ?, ?)',
        [user.id, user.nome, user.email, password.encoded, user.foto_url]);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') throw new HttpError(409, 'Este e-mail já está cadastrado.');
      throw error;
    }
    return send(response, 201, { user: profileView(user), access_token: createToken(user), message: 'Conta criada.' });
  }

  if (pathname === '/api/auth/login' && request.method === 'POST') {
    const body = await readJson(request);
    const email = String(body.email || '').trim().toLowerCase();
    const senha = String(body.senha || '');
    if (!email || !senha) throw new HttpError(400, 'Informe e-mail e senha.');
    const [rows] = await pool.execute('SELECT id, nome, email, password_hash, foto_url FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user || !verifyPassword(senha, user.password_hash)) throw new HttpError(401, 'E-mail ou senha incorretos.');
    return send(response, 200, { user: profileView(user), access_token: createToken(user) });
  }

  if (pathname === '/api/genres' && request.method === 'GET') {
    const [rows] = await pool.execute('SELECT id, nome FROM genres ORDER BY nome ASC');
    return send(response, 200, rows);
  }

  if (pathname === '/api/uploads/cover' && request.method === 'POST') {
    const user = verifyToken(request);
    const body = await readJson(request, 9 * 1024 * 1024);
    const contentType = String(body.content_type || '').toLowerCase();
    const extensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    const extension = extensions[contentType];
    const encoded = String(body.base64 || '').replace(/^data:[^,]+,/, '');
    if (!extension || !encoded || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new HttpError(400, 'Envie uma imagem JPEG, PNG ou WebP válida.');
    const bytes = Buffer.from(encoded, 'base64');
    if (bytes.length > 6 * 1024 * 1024) throw new HttpError(413, 'A imagem deve ter até 6 MB.');
    const filename = crypto.randomUUID() + '.' + extension;
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(path.join(uploadDirectory, filename), bytes, { flag: 'wx' });
    const origin = config.publicApiUrl || (request.headers.host ? 'http://' + request.headers.host : 'http://localhost:' + config.apiPort);
    return send(response, 201, { image_url: origin + '/uploads/' + filename });
  }

  const movieCollection = pathname === '/api/movies';
  const movieMatch = pathname.match(/^\/api\/movies\/([0-9a-f-]{36})$/i);
  if (!movieCollection && !movieMatch) throw new HttpError(404, 'Rota não encontrada.');
  const user = verifyToken(request);

  if (movieCollection && request.method === 'GET') {
    let sql = 'SELECT m.*, g.nome AS genre FROM movies m LEFT JOIN genres g ON g.id = m.genre_id WHERE m.user_id = ?';
    const params = [user.id];
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');
    if (search) { sql += ' AND m.title LIKE ?'; params.push('%' + search.replace(/[\\%_]/g, '\\$&') + '%'); }
    if (status) { sql += ' AND m.status = ?'; params.push(status); }
    if (url.searchParams.get('favorite') === 'true') sql += ' AND m.favorite = 1';
    sql += ' ORDER BY m.created_at DESC';
    const [rows] = await pool.execute(sql, params);
    return send(response, 200, rows.map(mapMovie));
  }

  if (movieCollection && request.method === 'POST') {
    const values = movieInput(await readJson(request));
    const genreId = await resolveGenre(values.genre_name);
    const newMovieId = crypto.randomUUID();
    await pool.execute(
      'INSERT INTO movies (id, title, description, year, director, duration, rating, status, favorite, image_url, trailer_url, genre_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [newMovieId, values.title, values.description || null, values.year, values.director || null, values.duration ?? null, values.rating ?? null, values.status, values.favorite || false, values.image_url || null, values.trailer_url || null, genreId, user.id],
    );
    const created = await findMovie(newMovieId, user.id);
    return send(response, 201, mapMovie(created));
  }

  const movieId = movieMatch && movieMatch[1];
  if (movieMatch && request.method === 'GET') {
    const movie = await findMovie(movieId, user.id);
    if (!movie) throw new HttpError(404, 'Filme não encontrado.');
    return send(response, 200, mapMovie(movie));
  }
  if (movieMatch && request.method === 'PATCH') {
    const values = movieInput(await readJson(request), true);
    const columns = { title: 'title', description: 'description', year: 'year', director: 'director', duration: 'duration', rating: 'rating', status: 'status', favorite: 'favorite', image_url: 'image_url', trailer_url: 'trailer_url' };
    if (values.genre_name !== undefined) { values.genre_id = await resolveGenre(values.genre_name); delete values.genre_name; }
    const assignments = [];
    const params = [];
    for (const [key, value] of Object.entries(values)) {
      const column = key === 'genre_id' ? 'genre_id' : columns[key];
      if (!column) continue;
      assignments.push('`' + column + '` = ?');
      params.push(value);
    }
    if (assignments.length === 0) throw new HttpError(400, 'Nenhuma alteração foi enviada.');
    params.push(movieId, user.id);
    const [result] = await pool.execute('UPDATE movies SET ' + assignments.join(', ') + ' WHERE id = ? AND user_id = ?', params);
    if (!result.affectedRows) throw new HttpError(404, 'Filme não encontrado.');
    return send(response, 200, mapMovie(await findMovie(movieId, user.id)));
  }
  if (movieMatch && request.method === 'DELETE') {
    const [result] = await pool.execute('DELETE FROM movies WHERE id = ? AND user_id = ?', [movieId, user.id]);
    if (!result.affectedRows) throw new HttpError(404, 'Filme não encontrado.');
    return send(response, 200, { message: 'Filme removido.' });
  }
  throw new HttpError(405, 'Método não permitido.');
}

const server = http.createServer((request, response) => {
  handle(request, response).catch((error) => {
    if (!(error instanceof HttpError)) console.error(error);
    if (!response.headersSent) send(response, error.status || 500, { error: error.message || 'Erro interno no servidor.' });
    else response.destroy();
  });
});

server.listen(config.apiPort, '0.0.0.0', () => {
  console.log('MovieHub API ouvindo na porta ' + config.apiPort + '.');
  if (!pool) console.log('Configure backend/.env para conectar ao MySQL.');
});


