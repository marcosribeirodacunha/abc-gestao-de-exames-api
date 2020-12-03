<h1 align="center">
  <br />
  <img alt="Aurora Events" src="./github/logo.svg" width="200px" />
</h1>

<h4 align="center">API para a aplicação ABC Gestão de exames onde é possível realizar o cadastro e controle de exames de uma empresa</h4>

<p align="center">
  <img alt="Linguagem mais usada" src="https://img.shields.io/github/languages/top/marcosribeirodacunha/abc-gestao-de-exames-api?style=flat">

  <img alt="Objetivo: estudo" src="https://img.shields.io/badge/purpose-study-lightgrey?style=flat">

  <img alt="GitHub" src="https://img.shields.io/github/license/marcosribeirodacunha/abc-gestao-de-exames">

  <img alt="ESlint" src="https://img.shields.io/badge/dynamic/json?color=4b32c3&label=eslint&query=%24.devDependencies.eslint&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fabc-gestao-de-exames-api%2Fmaster%2Fpackage.json&logo=eslint" />

  <img alt="Prettier" src="https://img.shields.io/badge/dynamic/json?color=f7b93e&label=prettier&query=%24.devDependencies.prettier&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fabc-gestao-de-exames-api%2Fmaster%2Fpackage.json&logo=prettier">

  <img alt="Code style: Airbnb" src="https://img.shields.io/badge/code%20style-airbnb-ff5a5f" />

  <img alt="Code style: Airbnb" src="https://img.shields.io/badge/heroku-deployed-430098?logo=heroku" />
</p>

<p align="center">
  <a href="#-recursos">Recursos</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-configurando-as-variáveis-de-ambiente">Configuração</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-executando-a-api">Executando a API</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-insomnia">Insomnia</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 🗃 Recursos

- CRUD de cargos, usuários, tipos de exames, categorias, e exames;
- Login com matricula ou email e senha;
- Listagem dinâmica para usuários com os seguintes filtros (_via query params_):
  - Nome;
  - Matrícula;
  - Cargo;
- Listagem dinâmica para exams com os seguintes filtros (_via query params_):
  - Nome do funcionário;
  - Matrícula do funcionário;
  - Cargo do funcionário;
  - Tipo do exame;
  - Categoria do exame;
  - Validade (por período);
- Upload de imagem do usuário para um diretório local **ou**;
- Upload de imagem do usuário para o [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage).

## ↖ Rotas

- [x] CRUDs seguindo o seguinte modelo:
  - [x] `GET /`
  - [x] `GET /:id`
  - [x] `POST /`
  - [x] `PATCH /:id`
  - [x] `DELETE /:id`
    - [x] Cargo de usuário: _prefixo_ `jobs`
    - [x] Usuário: _prefixo_ `users`
    - [x] Tipos de exame: _prefixo_ `exam-types`
    - [x] Categorias: _prefixo_ `categories`
    - [x] Exames: _prefixo_ `exams`
- [x] Login: `POST sessions`
- [x] Rotas "secretas" para que não necessitam de autenticação:
  - [x] `POST secret/jobs` - Criar cargo
  - [x] `POST secret/users` - Criar usuário

Obs.: As rotas "secretas" permitem criar um cargo e um usuário usuário enquanto não há nenhum registro, portanto, não havendo usuário que possa fazer login na aplicação.

## ⚙ Instalação

Para clonar e executar esta aplicação é necessário possuir instalado [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/download/) (que instala também o [npm](https://www.npmjs.com/)). Em sua linha de comando:

```bash
# Clone o repositório
$ git clone https://github.com/marcosribeirodacunha/abc-gestao-de-exames-api.git

# Entre no repositório
$ cd abc-gestao-de-exames-api

# Instale as dependências
$ yarn
// ou npm install
```

## 🛠 Configurando as variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env`.

- Na variável `APP_URL` adicione a url do servidor no qual a aplicação está sendo executada. (Pode não ser necessário modificar esta variável);
- Insira na variável `AUTH_SECRET` uma string que servirá para geração do token JWT. É recomendável que esta string seja um _hash md5_ aleatório. Caso deseje, é possível gerar uma _hash md5_ [aqui](http://www.md5.cz/).

Siga os passos seguintes para concluir a configuração das variáveis de ambiente.

### 🎲 Banco de dados

Esta aplicação utiliza como banco de dados o [Postgres](https://www.postgresql.org/) em um container do [Docker](https://www.docker.com/). Entretanto é possível utilizar o banco instalado localmente.

Antes de realizar as _migrations_ realize os seguintes passos:

- Crie um banco de dados com o mesmo nome daquele contido na variável `TYPEORM_DATABASE` do arquivo `.env`;
- Adicione os dados de conexão do banco de dados postgres nas seguintes variáveis:
  - `TYPEORM_HOST`
  - `TYPEORM_PORT`
  - `TYPEORM_USERNAME`
  - `TYPEORM_PASSWORD`
  - `TYPEORM_DATABASE`

### 📤 Upload de arquivos

Para o upload de arquivos é possível, por padrão, utilizar duas opções:

- Upload para um diretório local (diretório `tmp`) **ou**;
- Upload para o [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage)

Caso opte pelo upload no diretório local basta modificar a variável `STORAGE_TYPE` para **local**.

Caso opte pelo upload para o IBM COS, certifique-se de possuir uma conta na plataforma. É possível adquirir uma conta gratuíta com diversos benefícios.
Modifique a variável `STORAGE_TYPE` para **cos**. Em seguida modifique as seguintes variáveis:

- `IBM_ENDPOINT`
- `IBM_API_KEY_ID`
- `IBM_SERVICE_INSTANCE_ID`
- `IBM_BUCKET`

Em caso de dúvidas para localizar os valores destas variáveis é possível encontrar informações detalhadas [aqui](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-node) e [aqui](https://cloud.ibm.com/docs/cloud-object-storage/iam?topic=cloud-object-storage-service-credentials).

## ▶ Executando a API

Após concluir os passos anteriores execute os seguintes comandos:

```bash
# Executa as migrations
# Uma vez que todas as migrações estão feitas não é necessário-las

$ yarn typeorm migration:run
// ou npm run typeorm migration:run

# Para executar a API em ambiente de desenvolvimento
$ yarn dev
// ou npm run dev
```

## 🟣 Insomnia

Para testar a aplicação utilizando o [Insomnia](https://insomnia.rest/) clique no botão abaixo para criar um workspace com todas as rotas necessárias.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fabc-gestao-de-exames-api%2Fmaster%2Fgithub%2FInsomnia_workspace.json)

## 👨🏽‍💻 Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage)
- [Babel](https://babeljs.io/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 📜 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
