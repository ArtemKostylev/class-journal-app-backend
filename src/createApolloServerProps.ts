import path from 'path';
import { mergeResolvers } from './utils';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const accompanyResolvers = require('./graphql-api/accompany');
const adminResolvers = require('./graphql-api/admin');
const authResolvers = require('./graphql-api/auth');
const consultResolvers = require('./graphql-api/consult');
const courseResolvers = require('./graphql-api/course');
const journalResolvers = require('./graphql-api/journal');
const noteResolvers = require('./graphql-api/notes');
const replacementResolvers = require('./graphql-api/replacement');
const specializationResolvers = require('./graphql-api/specialization');
const studentResolvers = require('./graphql-api/student');
const subgroupResolvers = require('./graphql-api/subgroup');
const midtermExamResolvers = require('./graphql-api/midtermExam');

const resolvers = mergeResolvers(
    [
        subgroupResolvers,
        studentResolvers,
        replacementResolvers,
        noteResolvers,
        journalResolvers,
        courseResolvers,
        consultResolvers,
        authResolvers,
        adminResolvers,
        accompanyResolvers,
        specializationResolvers,
        midtermExamResolvers
    ]
);

const typesArray = loadFilesSync(path.join(__dirname, '.'), {
    recursive: true,
    extensions: ['graphql'],
});

const typeDefs = mergeTypeDefs(typesArray);

export const createApolloServerProps = () => {
    return {
        resolvers,
        typeDefs,
    };
};
