const {ApolloServer} = require('apollo-server-express');
const {createApolloServerProps} = require('./createApolloServerProps');
import {PrismaClient} from '@prisma/client';

const {getUserId} = require('./utils');
const {graphqlUploadExpress} = require('graphql-upload');
const {ApolloServerPluginLandingPageGraphQLPlayground} = require('apollo-server-core');
const {makeExecutableSchema} = require('@graphql-tools/schema');
import express, {Request} from 'express';

export type Context = {
  userId: (req: any) => void;
  prisma: PrismaClient;
}

async function startApolloServer() {
  const prisma = new PrismaClient();

  const {typeDefs, resolvers} = createApolloServerProps();
  const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    cacheControl: {
      calculateHttpHeaders: false,
    },
    context: ({req}: { req: Request }) => {
      return {
        prisma,
        userId: getUserId(req),
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise((resolve) => app.listen({port: 4000}, resolve as () => void));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
