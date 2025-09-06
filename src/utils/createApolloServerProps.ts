import path from 'path'
import { mergeResolvers } from './mergeResolvers'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const adminResolvers = require('../graphql-api/admin')

const resolvers = mergeResolvers([adminResolvers])

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
