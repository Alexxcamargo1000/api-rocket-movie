# Rocket Movie API

A Rocket Movie API é uma API REST criada para permitir que os usuários cadastrem filmes e atribuam uma nota para eles.

## Tecnologias utilizadas

- Node.js
- Express
- SQLite
- knex

## Instalação

1. Clone este repositório em sua máquina local usando o comando `git clone https://github.com/Alexxcamargo1000/api-rocket-movie.git`
2. Instale as dependências com o comando `npm install`

## Uso

1. Inicie a aplicação com o comando `npm start`
2. Abra seu navegador ou cliente de API favorito e acesse a URL `http://localhost:3333`
3. Utilize as rotas disponíveis para cadastrar usuários e filmes

## Rotas disponíveis

  **O ID do usuário e pego pelo header**
- `POST /users`: cadastra um novo usuário na aplicação.
- `DELETE /users`: deleta um usuário.
- `PUT /users`: atualiza um usuário.
- `PATCH /users/avatar`: atualiza a imagem do usuário.
- `DELETE /users/avatar`: deletar a imagem do usuário.

- `POST /movie`: cadastra um novo filme na aplicação.
- `GET /movie`: retorna uma lista com todos os filmes cadastrados na aplicação.
- `GET /movie/:id`: retorna as informações do filme com o ID especificado.
- `DELETE /movie/:id`: deleta um filme especifico pelo id.

- `GET /tags`: retorna todas as tags cadastradas.

- `POST /sessions`: cria um token de acesso a aplicação.



## Autor

- [Alex Camargo](https://www.github.com/alexxcamargo1000)