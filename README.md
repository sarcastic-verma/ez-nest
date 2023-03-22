<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

A template for nestjs with locust, prisma, webpack, firebase, sqs, terminus, repl, testing, validation, swagger, @nest/config, redis and newrelic. For deployment, we have two options:
* Cloud Native: This is pretty straight-forward and once can use the standard build script with Elastic Beanstalk or use the existing basic Docker file.

* Serverless: For this, we are using ECR for deploying to lambdas as that has 10GB of space available for deployment compared to 250MB(unzipped including layers).

### Deployment Note
Currently, one needs keys for all the modules for app to work completely. Incase, you wanna skip out those just comment out whichever keys you don't have.  

## Pre-requisite
* Create a ```.env``` file to the root of the repo after cloning the template. It should have all the keys mentioned in ```.env.sample```
* Make sure your ```npx``` works to use prisma commands

## Installation

```bash
$ yarn
```
This will automatically generate the client for prisma as the schema in ```prisma/schema.prisma```.

## Running the app(uses webpack)

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# repl mode
$ yarn start:repl
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov

# load test with locust, edit locustfile.py to add your own endpoints testing
$ yarn test:laod
```

## Prisma

```bash
# Generate client
$ yarn prisma:gen

# Reset dev db
$ migrate:reset:dev

# Run dev migrations
$ yarn migrate:run:dev

# Run prod migrations
$ yarn migrate:run:prod

# Generate new migrations for schema changes
$ yarn migrate:gen
```

#### Note for prisma migrate with docker
Prisma Migrate in non-interactive environments
Prisma detects when you run CLI commands in non-interactive environments, such as Docker, from Node scripts or in bash shells. When this happens a warning displays, indicating that the environment is non-interactive and the ```migrate dev``` command is not supported.

To ensure the Docker environment picks up the command, run the image in interactive mode so that it reacts to the ```migrate dev``` command.

```bash
docker run --interactive --tty <image name>
# or
docker -it <image name>

# Example usage
$ docker run -it node
```

## Health check
To check the health of your app, navigate to ```/health-check``` in your browser after starting the app.
