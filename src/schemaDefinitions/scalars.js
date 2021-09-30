const gql = require("graphql-tag");

const typeDef = gql`
  scalar Date
  scalar Upload
`;

module.exports(typeDef);
