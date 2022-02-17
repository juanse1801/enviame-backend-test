FROM node:14

RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]


COPY ["package.json","package-lock.json", "/usr/ecommerce-service/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".","/usr/ecommerce-service/src"]

EXPOSE 3000

CMD ["node", "main.js"]
