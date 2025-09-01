import path from 'path'
import { mergeResolvers } from './utils'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const accompanyResolvers = require('./graphql-api/accompany')
const adminResolvers = require('./graphql-api/admin')
const courseResolvers = require('./graphql-api/course')
const replacementResolvers = require('./graphql-api/replacement')
const specializationResolvers = require('./graphql-api/specialization')
const studentResolvers = require('./graphql-api/student')
const midtermExamResolvers = require('./graphql-api/midtermExam')

const resolvers = mergeResolvers([
    studentResolvers,
    replacementResolvers,
    courseResolvers,
    adminResolvers,
    accompanyResolvers,
    specializationResolvers,
    midtermExamResolvers,
])

const typesArray = loadFilesSync(path.join(__dirname, '.'), {
    recursive: true,
    extensions: ['graphql'],
})

const typeDefs = mergeTypeDefs(typesArray)

export const createApolloServerProps = () => {
    return {
        resolvers,
        typeDefs,
    }
}
