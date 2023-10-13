FROM node:16

WORKDIR /veminto-prototype-main

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]