const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const GraphQLDateTime = require("graphql-iso-date");

const prisma = new PrismaClient();

const resolvers = {
  Date: GraphQLDateTime,
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
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

//TODO Add ressolvers, add types for queries and objects, create mutations, connect with prsma client
