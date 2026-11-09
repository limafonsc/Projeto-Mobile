# Backend MovieHub com MySQL

API em Node.js com banco MySQL. O driver usado é `mysql2`; senhas são protegidas com scrypt e a API emite tokens assinados por HMAC.

## Preparar o MySQL

1. Instale e inicie MySQL Server 8.0 ou superior.
2. Na pasta `backend`, execute `schema.sql` no MySQL Workbench ou pelo terminal: `mysql -u root -p < schema.sql`.
3. Copie `.env.example` para `.env` e informe usuário, senha e um `JWT_SECRET` longo e aleatório. O banco `moviehub` é criado pelo SQL.
4. Na pasta `backend`, execute `npm install` e depois `npm start`.
5. Confira `http://localhost:3333/api/health`. A resposta deve indicar `database: mysql`.

Nunca compartilhe `backend/.env` nem coloque a senha do banco no app.

## Apontar o app para a API

Defina `EXPO_PUBLIC_API_URL` em um `.env` na raiz do app antes de iniciar o Expo:

- Android Emulator: `http://10.0.2.2:3333/api`
- iOS Simulator: `http://localhost:3333/api`
- Celular físico: `http://IP-DO-COMPUTADOR-NA-REDE:3333/api`

No caso do celular físico, configure também `PUBLIC_API_URL` em `backend/.env` com a URL do computador e a porta `3333`, para que as capas retornem links acessíveis pelo telefone. Ambos devem estar na mesma rede. Reinicie o Expo depois de mudar o arquivo `.env`.

## Rotas

- `POST /api/auth/register` — `{ "nome", "email", "senha" }`
- `POST /api/auth/login` — `{ "email", "senha" }`
- `GET /api/genres`
- `POST /api/uploads/cover` — requer token; recebe imagem Base64 e devolve URL local da capa
- `GET /api/movies` — requer `Authorization: Bearer <access_token>`; aceita `search`, `status` e `favorite=true`
- `POST /api/movies` — requer token; aceita `titulo`, `descricao`, `ano`, `diretor`, `duracao` em minutos, `nota`, `status`, `favoritado`, `imagem_url`, `trailer_url` e `genero`
- `GET /api/movies/:id`, `PATCH /api/movies/:id` e `DELETE /api/movies/:id` — requer token e só acessa filmes do usuário autenticado

O esquema segue o documento do projeto e usa `users`, `genres` e `movies`. Os arquivos de capa são gravados em `backend/uploads` e não são incluídos no ZIP.
