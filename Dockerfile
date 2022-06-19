FROM node:16-alpine

WORKDIR /app


COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN npm i pnpm -g && pnpm i

EXPOSE 3333

CMD ["pnpm", "dev"]
