# Task List

## Used Stack

- React
- JavaScript
- Docker
- PostgreSQL
- ExpressJS

### on backend

- prisma
- bcrypt
- yup
- passport
- passport-jwt
- fakerjs

### on frontend

- axios
- tailwindcss

## Getting Started

First, create .env file from .env.example in backend folder

Run the development:

From docker folder:

```bash
docker-compose up --build
```

Or use existed PostgreSQL (you need to change DATABASE_URL in .env as well)

From backend folder:

```bash
npm ci
#then
npm run dev
```

From frontend folder:

```bash
npm ci
#then
npm run dev
```

Create database with prisma:

```bash
npx prisma generate
# then
npx prisma db push
# seed if need to
npx prisma db seed
```

### users in seed

| Login | Password  |
| ----- | --------- |
| user1 | password1 |
| user2 | password2 |
| user3 | password3 |
