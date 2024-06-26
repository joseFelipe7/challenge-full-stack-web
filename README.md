<p align="center" backgroud="#000">
    <a href=" target="_blank"><img src="https://isalab.com.br/_next/image?url=%2Fassets%2FisaSaudeLogo.png&w=96&q=75" width="200" alt="Laravel Logo"></a>
    <h3 align="center">A ISA leva saúde onde você estiver!</h3>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres">
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express">
</p>

# Gerenciador de pacientes 😷🤒

# Desafio Técnico - Desenvolvedor Full Stack - ISA

## 🚀 API Rest desenvolvida em:<br/>
✔️**NODEJs 20+**<br/>
✔️**Express**<br/>
✔️**Prisma**<br/>
✔️**Postgres**<br/>
✔️**JWT**<br/>
✔️**SOLID**<br/>
✔️**Documentação com Postman**<br/>

## 🚀 FRONTEND desenvolvido em:<br/>
✔️**NODEJs 20+**<br/>
✔️**Next 14**<br/>
✔️**Radix**<br/>
✔️**Tailwind**<br/>
✔️**React Hook Form**<br/>
✔️**Shadcnui**<br/>


# 🚀 Como rodar o projeto:
> Primeiro certifique-se de ter o docker e o node instalado em sua maquina.<br/><br/>

> crie o arquivo .env na raiz do seu projeto backend e preencha os seguintes campos:
```
DATABASE_URL="postgresql://user:password@postgres_db:5432/mydatabase?schema=public"
SECRET_KEY="yh79wehgydf8gs87gdtyh87tg2wq867gds"
TOKEN_EXPIRES_IN='1h'
```
<br/><br/>
> Para criar as tabelas e dados de seu banco de dados rode os seguintes comandos:
```
npm install
npx prisma migrate dev
npx prisma db seed
 ```
<br/><br/>
> Agora para executar seu projeto apenas rode na raiz dos seus dois projetos:
```
docker compose up
```
<br/><br/>
# 🚀 Acesse...
- [Documentação Postman aqui](https://documenter.getpostman.com/view/12476316/2sA3drKFg3).

<p align="center">
    <a href="" target="_blank"><img src="https://isalab.com.br/_next/image?url=%2Fassets%2FisaSaudeLogo.png&w=96&q=75" width="150" alt="Laravel Logo"></a>
    <h5 align="center">Desenvolvido com ♥ por JF - 2024</h5>
</p>


# Teste Técnico de Desenvolvedor Full Stack - ISA

## Descrição do Projeto

O objetivo deste teste técnico é desenvolver uma aplicação web para cadastro de pacientes utilizando uma stack Javascript. 

O projeto deverá ser dividido em duas partes: Frontend e Backend, cada uma como um pacote separado no mesmo repositório.

## Instruções para Submissão:

- Faça um Fork deste repositório;
- Desenvolva a sua solução;
- Faça o commit em seu fork;
- Apresente a solução.

## Estrutura do Projeto

O repositório deverá ter a seguinte estrutura de diretórios:

```sh
/
├── /frontend
└── /backend
```

> **Aviso**: Este não é um projeto MONOREPO. São duas aplicações no mesmo repositório para facilitar o envio e a validação.

## Tecnologias Utilizadas

- **Frontend**: React com [Next.js](https://nextjs.org/)
- **Backend**: Node.js com [Express](https://expressjs.com/pt-br/) ou [Fastify](https://fastify.dev/)
- **Banco de Dados**: Postgres ou MongoDB

### Recomendaçõe

- Caso utilize Postgres, faça com o [Prisma ORM](https://www.prisma.io/). Se for de MongoDB, utilize o [Mongoose ODM](https://mongoosejs.com/).
- Dê preferência ao [Radix UI](https://www.radix-ui.com/) para componentes e [Tailwind CSS](https://tailwindcss.com/) para estilização.
- Trabalhe com formulários utilizando [React Hook Form](https://react-hook-form.com/).

## Layout Base 

O layout base da aplicação está disponível no 
[Figma](https://www.figma.com/design/ZuaBhEgvJrKoMVER6AWyas/Untitled?node-id=0-1&t=Iiwyo78Ip0XWEb5Q-0).

> O Layout apresentado é apenas uma sugestão, fique a vontade para estilizar da forma qeu preferir.

## Funcionalidades Requeridas

### Cadastro de Usuários

O cadastro do usuário deve incluir os seguintes campos:
- Nome
- E-mail
- Senha

> Inclua uma validação de senha forte e confirmação de senha.

### Autenticação

Uma tela de login básica com email e senha que faz a autenticação na API, que deve retornar um token JWT.

### Cadastro de Pacientes

O cadastro do paciente deve incluir os seguintes campos:
- Nome
- Documento
- Email
- Telefone
- Data de Nascimento
- Gênero
- Número da Carteirinha do Convênio

> Lembre que existem campos opcionais e campos únicos. A decisão de como lidar com cada campo é sua.

### Auditoria e Deleção

- Registro dos horários de criação e última atualização do paciente.
- Remoção de registros por soft delete com registro do horário da remoção.
- Auditoria básica indicando o usuário responsável pela criação, última edição e remoção dos registros.

### Dados adicionais

Fique a vontade para adicionar os campos e entidades que julgar necessário para a aplicação.
 

## Docker

Crie o `Dockerfile` cada app em seu respectivo diretório e um `docker-compose.yml` na raiz do repositório que permita subir os dois projetos juntos.
