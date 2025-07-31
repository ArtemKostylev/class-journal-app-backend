import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';

const {createApolloServerProps} = require('./createApolloServerProps');
import { authentication } from './middleware/authentication';

declare module 'express-serve-static-core' {
  interface Request {
      userId: number;
  }
}

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

app.use(GRAPHQL_PATH,
  cors<cors.CorsRequest>(),
  express.json(),
  authentication,
  expressMiddleware(server, {
    context: async ({req}) => ({
      userId: req.userId
    })
  })
)

await new Promise((resolve) => app.listen({port: PORT}, resolve as () => void));
console.log(`🚀 Server ready at http://localhost:4000${GRAPHQL_PATH}`);
