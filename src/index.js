const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./createApolloServerProps");
const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");
const { graphqlUploadExpress } = require("graphql-upload");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

async function startApolloServer() {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cacheControl: {
      calculateHttpHeaders: false,
    },
    context: ({ req }) => {
      return {
        ...req,
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
    path: "/",
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
