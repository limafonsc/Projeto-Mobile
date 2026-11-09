const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333/api';

let accessToken: string | null = null;

export type MovieRecord = {
  id: string;
  title: string;
  description: string | null;
  year: number;
  director: string | null;
  duration: number | null;
  rating: number | string | null;
  status: string;
  favorite: boolean;
  image_url: string | null;
  trailer_url: string | null;
  genre_id: number | null;
  genre: string | null;
  created_at: string;
};

export type Filme = {
  id: string;
  titulo: string;
  ano: string;
  duracao: string;
  genero: string;
  nota: string;
  status: string;
  diretor: string;
  dataAdicionado: string;
  descricao: string;
  favoritado: boolean;
  imagem: string | null;
  trailer_url: string | null;
};

export type FilmeInput = {
  titulo: string;
  genero: string;
  ano: number;
  duracao?: number | null;
  diretor?: string | null;
  descricao?: string | null;
  nota?: number | null;
  status: string;
  favoritado?: boolean;
  imagem_url?: string | null;
  trailer_url?: string | null;
};

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = 'Bearer ' + accessToken;
  Object.assign(headers, options.headers || {});
  let response: Response;
  try {
    response = await fetch(API_URL + path, { ...options, headers });
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se o backend está iniciado e se EXPO_PUBLIC_API_URL aponta para o computador.');
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || payload.message || 'Não foi possível concluir a solicitação.');
  return payload as T;
}

export type AuthResult = {
  access_token: string | null;
  refresh_token?: string | null;
  needs_email_confirmation?: boolean;
  message?: string;
  user: { id: string; nome: string; email: string; foto_url: string | null };
};

export async function registerUser(input: { nome: string; email: string; senha: string; foto_url?: string | null }) {
  return request<AuthResult>('/auth/register', { method: 'POST', body: JSON.stringify(input) });
}

export async function loginUser(input: { email: string; senha: string }) {
  const result = await request<AuthResult>('/auth/login', { method: 'POST', body: JSON.stringify(input) });
  setAccessToken(result.access_token);
  return result;
}

export function logoutUser() {
  setAccessToken(null);
}

function mapMovie(movie: MovieRecord): Filme {
  const date = movie.created_at ? new Date(movie.created_at) : new Date();
  return {
    id: movie.id,
    titulo: movie.title,
    ano: String(movie.year),
    duracao: movie.duration ? movie.duration + ' min' : '',
    genero: movie.genre || 'Sem gênero',
    nota: movie.rating == null ? '0.0' : Number(movie.rating).toFixed(1),
    status: movie.status,
    diretor: movie.director || '',
    dataAdicionado: date.toLocaleDateString('pt-BR'),
    descricao: movie.description || '',
    favoritado: movie.favorite,
    imagem: movie.image_url,
    trailer_url: movie.trailer_url,
  };
}

export async function getMovies(options: { favorite?: boolean; search?: string; status?: string } = {}) {
  const params = new URLSearchParams();
  if (options.favorite) params.set('favorite', 'true');
  if (options.search) params.set('search', options.search);
  if (options.status) params.set('status', options.status);
  const query = params.toString();
  const rows = await request<MovieRecord[]>('/movies' + (query ? '?' + query : ''));
  return rows.map(mapMovie);
}

export async function getMovie(id: string) {
  return mapMovie(await request<MovieRecord>('/movies/' + encodeURIComponent(id)));
}

export async function createMovie(input: FilmeInput) {
  return mapMovie(await request<MovieRecord>('/movies', { method: 'POST', body: JSON.stringify(input) }));
}

export async function updateMovie(id: string, input: Partial<FilmeInput>) {
  return mapMovie(await request<MovieRecord>('/movies/' + encodeURIComponent(id), { method: 'PATCH', body: JSON.stringify(input) }));
}

export async function deleteMovie(id: string) {
  return request<{ message: string }>('/movies/' + encodeURIComponent(id), { method: 'DELETE' });
}

export async function uploadCover(base64: string, contentType: string) {
  return request<{ image_url: string }>('/uploads/cover', {
    method: 'POST', body: JSON.stringify({ base64, content_type: contentType }),
  });
}
