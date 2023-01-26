# Todo NestJS App

A ToDo API made with [Nest](https://github.com/nestjs/nest) and MySQL deployed to [API page](https://todo-nestjs.up.railway.app).

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Endpoints

- GET                 tasks/:username
- POST                tasks/:username/add
- GET, PATCH, DELETE  tasks/:username/:id

- GET   users/register
- GET   users/account/:username
- PATCH users/update/:username

- POST auth/login { "email": "email", "password": "password" }
