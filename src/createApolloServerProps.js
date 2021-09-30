const queries = require("./resolvers/queries");
const mutations = require("./resolvers/mutations");
const { GraphQLUpload } = require("graphql-upload");
const GraphQLDateTime = require("graphql-iso-date");

const fs = require("fs");
const path = require("path");

const resolvers = {
  Date: GraphQLDateTime,
  Upload: GraphQLUpload,
  queries,
  mutations,
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")

module.exports({ resolvers, typeDefs });
