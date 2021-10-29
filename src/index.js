const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const GraphQLDateTime = require("graphql-iso-date");

async function startApolloServer() {
  const prisma = new PrismaClient();

  const resolvers = {
    Date: GraphQLDateTime,
    Upload: GraphQLUpload,
    Query,
    Mutation,
  };

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    cacheControl: {
      calculateHttpHeaders: false,
    },
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
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
