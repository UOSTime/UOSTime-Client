FROM node:12

COPY ./ /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 8080

CMD npm start