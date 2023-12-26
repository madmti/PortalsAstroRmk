FROM oven/bun:alpine

WORKDIR /app

COPY ./ ./

RUN apk update

RUN bun --version

RUN apk add npm

RUN npm --version

RUN npm install

EXPOSE 4321

RUN bun run build

ENTRYPOINT [ "sh", "entrypoint.sh" ]