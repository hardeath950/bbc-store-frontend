FROM node:16-alpine

WORKDIR /app


COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN npm i pnpm -g && pnpm i

EXPOSE 3333

EXPOSE 3010

CMD ["pnpm", "dev"]
