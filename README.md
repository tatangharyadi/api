## API Gateway
Implementation of Passport authentication, JWT token and RBAC using TypeScript, NestJS and PostgreSQL. The API gateway and PostgreSQL are running inside Docker containers.

# Events
- 'user.created', on user created event, an email is sent to the new user.
- 'order.create', emit an event to microservice via RabbitMQ.
