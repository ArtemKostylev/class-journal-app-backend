const { GraphQLUpload } = require("graphql-upload");
const GraphQLDateTime = require("graphql-iso-date");

const merge = require("lodash.merge");

const {
  uploadTypes,
  uploadResolvers,
} = require("./schemaDefinitions/typeDefs/uploads");
const {
  teacherTypes,
  teacherResolvers,
} = require("./schemaDefinitions/typeDefs/teacher");
const {
  subgroupTypes,
  subgroupResolvers,
} = require("./schemaDefinitions/typeDefs/subgroups");
const {
  studentTypes,
  studentResolvers,
} = require("./schemaDefinitions/typeDefs/student");
const { scalarTypes } = require("./schemaDefinitions/typeDefs/scalars");
const {
  replacementTypes,
  replacementResolvers,
} = require("./schemaDefinitions/typeDefs/replacement");
const {
  partnerTypes,
  partnerResolvers,
} = require("./schemaDefinitions/typeDefs/partner");
const {
  noteTypes,
  noteResolvers,
} = require("./schemaDefinitions/typeDefs/notes");
const {
  journalTypes,
  journalResolvers,
} = require("./schemaDefinitions/typeDefs/journal");
const {
  courseTypes,
  courseResolvers,
} = require("./schemaDefinitions/typeDefs/course");
const {
  consultTypes,
  consultResolvers,
} = require("./schemaDefinitions/typeDefs/consult");
const {
  authTypes,
  authResolvers,
} = require("./schemaDefinitions/typeDefs/auth");
const {
  adminTypes,
  adminResolvers,
} = require("./schemaDefinitions/typeDefs/admin");

const fs = require("fs");
const path = require("path");

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

const typeDefs = [
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

module.exports({ resolvers, typeDefs });
