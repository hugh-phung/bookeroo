FROM node:14-alpine

WORKDIR /usr/src/app

COPY book-shop/ .

RUN npm install & npm audit fix

EXPOSE 3000

CMD ["npm", "start"]
