FROM node:14

RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]


COPY ["package.json","package-lock.json", "/usr/delivery-service/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".","/usr/delivery-service/src"]

EXPOSE 3000

CMD ["node", "main.js"]
