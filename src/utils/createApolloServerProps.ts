import path from 'path'
import { mergeResolvers } from './mergeResolvers'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const adminResolvers = require('../graphql-api/admin')
const courseResolvers = require('../graphql-api/course')
const specializationResolvers = require('../graphql-api/specialization')
const studentResolvers = require('../graphql-api/student')

const resolvers = mergeResolvers([studentResolvers, courseResolvers, adminResolvers, specializationResolvers])

const typesArray = loadFilesSync(path.join(__dirname, '..'), {
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
