# graphql-user-auth server

This is a GraphQL, Node.js, TypeORM server application written in Typescript. It provides a GraphQL API which accesses user records stored in a local Postgres database.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Environment](#environment)
4. [Other Demos](#other-demos)
5. [Contact Developer](#contact-developer)

## Introduction

This very light application serves as a simple demo of several technologies and authentication good-practices.

## Features

A user is defined by the following GraphQL Type:

```ts
{
  type User {
    id: ID!
    email: String!
  }
}
```

Registering a user is made possible with the following GraphQL Mutation:

```ts
{
  register(email: String!, password: String!): Boolean!
}
```

User login is made possible with the following GraphQL Mutation:

```ts
{
  login(email: String!, password: String!): User
}
```

Retrieval of the current authenticated user is made possible with the following GraphQL Query:

```ts
{
  type Query {
    me: User
  }
}
```

### JWT

[JSON Web Tokens](https://jwt.io/) was used in the user authentication strategy.

### TypeScript

Why TypeScript? Because, use of types lends itself to using highly-productive development tools and practices; such as, static checking and code refactoring during JavaScript development. Additionally, there is great support for TypeScript in the development community.

### Node.js

The application was built using [Node.js](https://nodejs.org/).

### TypeORM

The application was built using [TypeORM](https://typeorm.io/).

### Postgres

The application was built using [PostgreSQL](https://www.postgresql.org/).

### GraphQL

This application was built using the [Apollo Server](https://www.apollographql.com/docs/apollo-server/) GraphQL server and the Node.js apollo-server-express middleware.

The GraphQL schema is generated using the [GraphQL Code Generator](https://graphql-code-generator.com/).

**[⬆ back to top](#table-of-contents)**

## Environment

### Available Scripts

In the project directory, you can run:

#### `npm install`

Installs the necessary modules required to build and run the application.

#### `npm generate`

The GraphQL schema is generated using the [GraphQL Code Generator](https://graphql-code-generator.com/).

#### `npm start`

Stards the Node.js process, runs the app.<br />
Open [http://localhost:5002/graphql](http://localhost:5002/graphql) to view the GraphQL playground in the browser.

#### `npm run build`

Compiles the typescript using tsc, building the app for production.

#### `npm run test`

Tests will be added in the future.

**[⬆ back to top](#table-of-contents)**

## Other Demos

[tmdb-demo-ui](https://github.com/andyfrith/tmdb-demo-ui) - the UI counterpart- a minimal React Typescript application providing a simple UI that acesses the GraphQL API endpoints of the tmdb-demo server

[demo-gql-ui](https://github.com/andyfrith/demo-gql-ui) - A minimal React Typescript application providing a simple UI that acesses the GraphQL API endpoints of the demo-gql server

[react-portal](https://github.com/andyfrith/react-portal) - a React Redux application that provides simple user management tasks upon successful JWT authentication

[greasy-spoon-pos](https://github.com/andyfrith/greasy-spoon-pos) - a React Redux application that provides minimal features of a very basic restaurant Point of Sale system

[goodapplemedia.com](https://github.com/andyfrith/goodapplemedia.com) - a responsive website created with HTML5, Foundation CSS, and ES6 that demonstrates an exceptional and desirable user experience

**[⬆ back to top](#table-of-contents)**

## Contact Developer

I'm driven to deliver exemplary User Experiences and sound application architectures. I enjoy solving customer problems with excellent design and engineering- to greatly affect business success.

[Portfolio](http://goodapplemedia.com)

[Email: afrith.denver.usa@gmail.com](mailto:afrith.denver.gmail.com)

[LinkedIn](https://www.linkedin.com/in/goodapplemedia/)
