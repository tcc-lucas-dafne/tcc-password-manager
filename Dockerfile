FROM node:latest

COPY . /app

WORKDIR /app

COPY package*.json ./

CMD ["sh","-c", "yarn install && yarn start"]