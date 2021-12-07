const { GraphQLUpload } = require("graphql-upload");
const GraphQLDateTime = require("graphql-iso-date");

const merge = require("lodash.merge");

const {
  typeDef: uploadTypes,
  resolvers: uploadResolvers,
} = require("./schemaDefinitions/uploads");

const {
  typeDef: teacherTypes,
  resolvers: teacherResolvers,
} = require("./schemaDefinitions/teacher");
const {
  typeDef: subgroupTypes,
  resolvers: subgroupResolvers,
} = require("./schemaDefinitions/subgroups");
const {
  typeDef: studentTypes,
  resolvers: studentResolvers,
} = require("./schemaDefinitions/student");
const { typeDef: scalarTypes } = require("./schemaDefinitions/scalars");
const {
  typeDef: replacementTypes,
  resolvers: replacementResolvers,
} = require("./schemaDefinitions/replacement");
const {
  typeDef: partnerTypes,
  resolvers: partnerResolvers,
} = require("./schemaDefinitions/partner");
const {
  typeDef: noteTypes,
  resolvers: noteResolvers,
} = require("./schemaDefinitions/notes");
const {
  typeDef: journalTypes,
  resolvers: journalResolvers,
} = require("./schemaDefinitions/journal");
const {
  typeDef: courseTypes,
  resolvers: courseResolvers,
} = require("./schemaDefinitions/course");
const {
  typeDef: consultTypes,
  resolvers: consultResolvers,
} = require("./schemaDefinitions/consult");
const {
  typeDef: authTypes,
  resolvers: authResolvers,
} = require("./schemaDefinitions/auth");
const {
  typeDef: adminTypes,
  resolvers: adminResolvers,
} = require("./schemaDefinitions/admin");

const resolvers = merge(
  uploadResolvers,
  teacherResolvers,
  subgroupResolvers,
  studentResolvers,
  replacementResolvers,
  partnerResolvers,
  noteResolvers,
  journalResolvers,
  courseResolvers,
  consultResolvers,
  authResolvers,
  adminResolvers,
  {
    Date: GraphQLDateTime,
    Upload: GraphQLUpload,
  }
);

const baseTypes = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  scalar Date
  scalar Upload
`;

const typeDefs = [
  baseTypes,
  uploadTypes,
  teacherTypes,
  subgroupTypes,
  studentTypes,
  replacementTypes,
  partnerTypes,
  noteTypes,
  journalTypes,
  courseTypes,
  consultTypes,
  authTypes,
  adminTypes,
  scalarTypes,
];

const createApolloServerProps = () => {
  return { resolvers, typeDefs };
};

module.exports = { createApolloServerProps };
