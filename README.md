<h1 align="center">
  <a  href="https://github.com/raiane-oliveira/find-a-friend-API">
     <img src="https://github.com/raiane-oliveira/find-a-friend-API/assets/100815627/d898fd25-a4f2-4109-be95-81a243d5ed22" />
  </a>
</h1>

<!-- BADGES -->
<p align="center">
  <img src="https://badgen.net/npm/v/next/" />
  <img src="https://badgen.net/github/contributors/raiane-oliveira/find-a-friend-API" />
</p>

<h4 align="center"> 
	✔️  FindAFriend API - Completed  ✔️
</h4>

<p align="center">
 <a href="#-about">About</a> •
 <a href="#-run-locally">Run Locally</a> •
 <a href="#-features">Features</a> •
 <a href="#-tech-stack">Tech Stack</a> • 
 <a href="#-learnings">Learnings</a> •
 <a href="#-feedbacks">Feedbacks</a>
</p>

## 💻 About

A RESTful API for pet adoption, built with SOLID principles and tests.
This challenge was offered in Rocketseat's Ignite course.

<div align="center">
  <img src="https://github.com/raiane-oliveira/find-a-friend-API/assets/100815627/6343fbff-818a-463d-8934-440b9d251a37" />

*The ER diagram of the database*
</div>

## 👩‍💻 Run Locally

Clone the project

```bash
  git clone https://github.com/raiane-oliveira/find-a-friend-API
```

Go to the project directory and install the dependencies

```bash
  npm install
```

Create the database server on Docker container

```bash
  docker compose up
```

That command it will already start the container. If not, run this command:

```bash
  docker compose start
```

Finally, start the server

```bash
  npm run dev
```

## 🪸 Features

- [x] It must be possible to register a pet
- [x] It must be possible to list all the pets available for adoption in a city
- [x] It should be possible to filter pets by their characteristics
- [x] It should be possible to view details of a pet for adoption
- [x] It should be possible to register as an ORG
- [x] It should be possible to log in as an ORG
- [x] It should be possible to view details of an ORG

### 📏 Business rules

- [x] In order to list pets, it is mandatory to enter the city
- [x] An ORG must have an address and a WhatsApp number
- [x] A pet must be linked to an ORG
- [x] The user who wants to adopt will contact the ORG via WhatsApp
- [x] All filters, apart from the city, are optional
- [x] For an ORG to access the application as an admin, it must be logged in

## 📒 Learnings

- How to properly organize an REST API
- SOLID
  - Dependency Inversion
- Repository pattern
  - In-memory Database pattern
- Unit tests and E2E tests
  - Vitest environment
- Docker compose
- Factories pattern
- Middlewares and Controllers
- Contracts interfaces

## 🛠 Tech Stack

- TypeScript
- Prisma
- Fastify
- Docker
- Vitest

## 🤝 Feedbacks

If you have opinions on how I can improve this application, please send me a message on <a href="https://www.linkedin.com/in/raiane-oliveira-dev">Linkedin</a> or an <a href="mailto:raiane.oliveira404@gmail.com">email</a>.
I will be happy to answer and learn more from you! ;)



