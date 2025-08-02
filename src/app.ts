import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

import {createApolloServerProps} from './createApolloServerProps';
import { authentication } from './middleware/authentication';
import { teacherRouter } from './rest-api/teacher';
import { db } from './db';
import subgroupRouter from './rest-api/subgroup';
import { noteRouter } from './rest-api/note';

declare module 'express-serve-static-core' {
  interface Request {
      userId: number;
  }
}

async function main() {
  const PORT = process.env.PORT || 4000;
  const GRAPHQL_PATH = '/graphql';

  // init express application
  const app = express();
  const httpServer = http.createServer(app);

  // init gql schema
  const {typeDefs, resolvers} = createApolloServerProps();

  // init apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(cors<cors.CorsRequest>());
  app.use(express.json());
  app.use(authentication);

  // describe graphql api
  app.use(GRAPHQL_PATH,
    expressMiddleware(server, {
      context: async ({req}) => ({
        userId: req.userId,
        prisma: db
      })
    })
  )

  // describe rest api
  app.use('/api/teacher', teacherRouter);
  app.use('/api/subgroup', subgroupRouter);
  app.use('/api/note', noteRouter);

  // TODO: add error handling

  // start http-server application
  await new Promise((resolve) => app.listen({port: PORT}, resolve as () => void));
  console.log(`🚀 Server ready at http://localhost:4000${GRAPHQL_PATH}`);
}

main();
