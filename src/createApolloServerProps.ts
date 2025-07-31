import path from 'path';
import { mergeResolvers } from './utils';
const {loadFilesSync} = require('@graphql-tools/load-files');
const {mergeTypeDefs} = require('@graphql-tools/merge');

const uploadResolvers = require('./api/uploads');
const accompanyResolvers = require('./api/accompany');
const adminResolvers = require('./api/admin');
const authResolvers = require('./api/auth');
const consultResolvers = require('./api/consult');
const courseResolvers = require('./api/course');
const journalResolvers = require('./api/journal');
const noteResolvers = require('./api/notes');
const replacementResolvers = require('./api/replacement');
const specializationResolvers = require('./api/specialization');
const studentResolvers = require('./api/student');
const subgroupResolvers = require('./api/subgroup');
const teacherResolvers = require('./api/teacher');
const midtermExamResolvers = require('./api/midtermExam');

const resolvers = mergeResolvers(
    [
        uploadResolvers,
        teacherResolvers,
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
        midtermExamResolvers,
        // TODO: temporary disabled upload and date resolvers, mb they are included in newer versions
        {
            // Date: GraphQLDateTime,
            // Upload: GraphQLUpload,
        }
    ]
);

const typesArray = loadFilesSync(path.join(__dirname, '.'), {
    recursive: true,
    extensions: ['graphql'],
});

const typeDefs = mergeTypeDefs(typesArray);

const createApolloServerProps = () => {
    return {
        resolvers,
        typeDefs,
    };
};

module.exports = {createApolloServerProps};
