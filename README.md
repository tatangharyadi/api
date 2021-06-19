## Appendix

### Prerequisite

node --version

### Install NestJS

npm i -g @nestjs/cli
nest --version

### Generate New Project

nest new ...
npm run start:dev
localhost:3000

### Generate Module

nest g mo ...

### Generate Controller

nest g co ...
nest g co ... --no-spec
nest g co ... --dry-run

### Generate Service

nest g s ...

### Generate class (entity/DTO)

nest g cl ... --no-spec

### Generate guard

nest g gu ... --no-spec

### Dependencies

### 'Config'

npm i @nestjs/config
npm i @hapi/joi
npm i -D @types/hapi\_\_joi

### 'TypeOrm' PostgreSQL

npm i @nestjs/typeorm typeorm pg

### 'ValidationPipe'

npm i class-validator class-transformer reflect-metadata

### 'PartialType'

npm i @nestjs/mapped-types

### 'bcrypt'

npm i bcryptjs
npm i -D @types/bcryptjs

### 'Cookie-Parser'

npm i cookie-parser
npm i -D @types/cookie-parser

### 'Passport, JWT'

npm i @nestjs/passport passport passport-local
npm i -D @types/passport-local
npm i @nestjs/jwt passport-jwt
npm i -D @types/passport-jwt

### 'Events'

npm i @nestjs/event-emitter

### 'mailer'

npm i @nestjs-modules/mailer nodemailer
npm i -D @types/nodemailer

### 'Multer'

npm i -D @types/multer

### 'Cache, Redis'

npm i cache-manager
npm i -D @types/cache-manager
npm i cache-manager-redis-store
npm i redis
npm i -D @types/redis

### 'Faker'

npm i -D faker @types/faker

### 'Stripe'

npm i nestjs-stripe
