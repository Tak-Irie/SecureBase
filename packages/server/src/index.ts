import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from "express-session"
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import Keycloak from "keycloak-connect"
import { KeycloakContext, KeycloakTypeDefs, KeycloakSchemaDirectives } from 'keycloak-connect-graphql';

import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';

// import entities from "./graphql/entities/index"
import resolvers from "./graphql/resolvers/index"
// import { User } from './graphql/entities/User';
// import { UserResolver } from './graphql/resolvers/UserResolver';
// import { TestResolver } from './graphql/resolvers/TestResolver';
// import { TestEntity } from './graphql/entities/Test';


const main = async () => {
  dotenv.config()
  const app = express();
  const port = 4000;

  useContainer(Container);

  await createConnection({
    type: 'postgres',
    url:
      // process.env.DB_HOST ||
      'postgresql://postgres:postgres@localhost:5432/anysecure4',
    synchronize: true,
    logging: true,
    entities: ["./graphql/entities/*.ts"],
    migrations: ['../migrations/**/*/ts'],
    cli: {
      migrationsDir: '../migrations',
    },
  });
  app.set('trust proxy', true);

    app.use(
    cors({
      origin: ["https://studio.apollographql.com","http://localhost:3000"],
      credentials: true,
    })
  );

  const memoryStore = new session.MemoryStore();
  const keycloak = new Keycloak({store: memoryStore})

  app.use("http://localhost:4000/graphql", keycloak.middleware())

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
      dateScalarMode: 'isoDate',
      container: Container,
    }),
    typeDefs: [KeycloakTypeDefs],
    schemaDirectives: KeycloakSchemaDirectives,
    context: ({ res, req }) => ({
      req,
      res,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      kauth: new KeycloakContext({ req : req as any })
    }),

  });

  apolloSever.applyMiddleware({ app, cors: false });


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};


main().catch((err) => {
  console.error(err);
});
