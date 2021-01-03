import 'reflect-metadata';
import 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import { User } from './graphql/entities/User';
import { UserResolver } from './graphql/resolvers/UserResolver';


const main = async () => {
  const app = express();
  const port = 4000;

  useContainer(Container);

  //
  await createConnection({
    type: 'postgres',
    url:
      process.env.DB_HOST ||
      'postgresql://postgres:postgres@localhost:5432/anysecure4',
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ['../migrations/**/*/ts'],
    cli: {
      migrationsDir: '../migrations',
    },
  });
    app.use(
    cors({
      origin: ["https://studio.apollographql.com","http://localhost:3000"],
      credentials: true,
    })
  );
  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
      dateScalarMode: 'isoDate',
      container: Container,

      // authChecker:,
    }),
    context: ({ res, req }) => ({
      req,
      res,
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
