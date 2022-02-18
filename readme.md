- Requisitos del sistema:

* Docker
* Node.js

- Instalación:

* Clonar el repositorio.

* Instalar las dependencias de ambos servicios en sus respectivas carpetas

* Hacer el build de las imagenes

- docker-compose build

* Iniciar los contenedores

  - docker-compose up -d

*

Hay en total 5 contenedores:

Ecommerce:

- ecommerce-service ===> Contenedor del servicio de ecommerce
- ecommerceDB ===> Base de datos Mysql del servicio de ecommerce
- adminDatabase ===> Phpmyadmin para administrar la base de datos del ecommerce

Deliver:

- delivery-service ===> Contenedor del servicio de delivery
- deliveryDB ===> Base de datos de mongoDB del servicio de delivery

Si se require revisar algun contenedor: docker-compose logs -f "nomrbe del servicio" o docker logs -f "nombre del contenedor"

Si require entrar a la terminar de algun contenedor y revisar sus archivos:
docker exec -it "nombre del contenedor" bash

El servicio de Ecommerce consta de las siguientes rutas:

Usuarios:

- GET http://localhost:3000/users/list-sellers
  Requiere:

  - Bearer token de usuario administrador
    Retorna:
  - Array de usuarios tipo SELLER

- GET http://localhost:3000/users/get-seller
  Requiere:

  - { id: id de usuario tipo seller } = query;
  - Bearer token de usuario administrador
    Retorna:
  - Usuario buscado por id

- POST http://localhost:3000/users/create-seller
  Requiere:

  - { email, password, name } = body;
  - Bearer token de usuario administrador
    Retorna:
  - usuario tipo SELLER creado en la base de datos

- PUT http://localhost:3000/users/edit-seller
  Requiere:

  - { id: id de usuario SELLER a editar } = query;
  - { name, address, email } = body;
  - Bearer token de usuario administrador
    Retorna:
  - mensaje de confirmación

- DELETE http://localhost:3000/users/delete-seller
  Requiere:

  - { id: id de usuario SELLER a eliminar } = query;
  - Bearer token de usuario administrador
    Retorna:
  - mensaje de confirmación

- GET http://localhost:3000/users/seller-info
  Requiere:

  - Bearer token de usuario tipo SELLER
    Retorna:
  - información de usuario seller

- GET http://localhost:3000/users/seller-own-edit
  Requiere:

  - { name, address } = req.body;
  - Bearer token de usuario tipo SELLER
    Retorna:
  - mensaje de confirmacion

- GET http://localhost:3000/users/signup
  Requiere:

  - { email, password, address, name } = body;
    Retorna:
  - usuario creado

- GET http://localhost:3000/users/signin
  Requiere:
  - { email, password } = req.body;
    Retorna:
  - Token de acceso
