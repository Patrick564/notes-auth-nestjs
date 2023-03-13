FROM node:18.15-bullseye as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build
RUN npm prune --production

# Light image
FROM node:18.15-alpine3.17

WORKDIR /bin

COPY --from=builder /app/dist /bin/dist
COPY --from=builder /app/node_modules /bin/node_modules

ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "node", "/bin/dist/main.js" ]
