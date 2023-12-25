FROM oven/bun:alpine

WORKDIR /app

COPY ./ ./

RUN apk update

RUN bun --version

RUN apk add npm

RUN npm --version

RUN npm install

ENV BACKEND_URL_REST = http://192.168.0.5:3000/

EXPOSE 4321
RUN bun serve