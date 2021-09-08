FROM node:14-alpine as angular
ENV NODE_ENV=dev
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm install -g @angular/cli
RUN npm run build

EXPOSE 2400
RUN npm run start
