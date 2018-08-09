# USER DEMO API
Repository for the User Demo project

# How to build
Development so far has been using Linux. Requirements:
- Docker
- docker-compose

First, build the image
```bash
  # build the image
  docker-compose build

  # Then, spin up the containers
  docker-compose up
```
That's it. If there is any problem, `ctrl+C`, do `docker-compose down`, and then repeat the process. After the container is up, run another bash/terminal to run the migration.
```bash
  # for linux
  docker-compose exec web /bin/sh

  # alternatively, you can use the plain docker exec command
  docker ps
  docker exec -ti <web-container-id> /bin/sh

  # run migrate and seed
  npm run migrate
  npm run seed
```
To make a model, migration, and seed file, do the following.
```bash
  # make migration
  npm run create:migration -- "your migration name"

  # make seed files
  npm run create:seed -- "your seeder name"
```

# Description
- Language: Javascript, Nodejs
- Server/routing: expressJs
- ORM: Sequelize
- Testing: jest
- Container system: docker
- Database: PostgreSQL

# Ports
- `localhost:3000` The API server
- `localhost:1234` The Adminer (database admin site like PhpMyAdmin)

# API
## Login
URL : http://localhost:3000/login/
Request:
```
POST /login/ HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache

{
	"email": "demo@demo.com",
	"password": "demo1234"
}
```
Data:
```
{
	"email": "demo@demo.com",
	"password": "demo1234"
}
```
## Logout
URL : http://localhost:3000/logout/
Request:
```
GET /logout HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache
```
## Create
URL : http://localhost:3000/users/
Request:
```
POST /users/ HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

email=adrian%40gmail.com&password=adrian1234&name=adrian&phone=082113311212
```
Data:
```
email=adrian@gmail.com
password=adrian1234
name=adrian
phone=082113311212
```
## Update
URL : http://localhost:3000/users/:id
Request:
```
PATCH /users/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

password=demodemo1234
```
Data:
```
password=demodemo1234
```
## Get All User
URL : http://localhost:3000/users
Request:
```
GET /users HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache
```
## Get User by Id
URL : http://localhost:3000/users/:id
Request:
```
GET /users/1 HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache
```
## Delete User by Id
URL : http://localhost:3000/users/:id
Request:
```
DELETE /users/1 HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: fec34f04-3576-49c0-b398-ba336366e5e0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```