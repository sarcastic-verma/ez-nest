<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

A template for nestjs with locust, prisma, webpack, firebase, sqs, terminus, repl, testing, validation, swagger, @nest/config, redis and newrelic.
## Pre-requisite
* Create a ```.env``` file to the root of the repo after cloning the template. It should have all the keys mentioned in ```.env.sample```

## Installation

```bash
$ npm install
```
This will automatically generate the client for prisma as the schema in ```prisma/schema.prisma```.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
