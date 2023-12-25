FROM node:current-alpine3.19

WORKDIR /app

COPY ./ ./

RUN apk update

RUN node --version && npm --version

RUN npm install

ENV BACKEND_URL_REST = http://192.168.0.5:3000/

EXPOSE 4321
RUN npm run dev --host