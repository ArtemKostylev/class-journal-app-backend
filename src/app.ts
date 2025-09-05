import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express4'
import express from 'express'
import http from 'http'
import cors from 'cors'
import 'dotenv/config'

import { createApolloServerProps } from './utils/createApolloServerProps'
import { authentication } from './middleware/authentication'
import { teacherRouter } from './rest-api/teacher'
import { db } from './db'
import subgroupRouter from './rest-api/subgroup'
import { noteRouter } from './rest-api/note'
import { consultRouter } from './rest-api/consult'
import { groupConsultRouter } from './rest-api/groupConsult'
import { journalRouter } from './rest-api/journal'
import { userRouter } from './rest-api/user'
import { midtermExamRouter } from './rest-api/midtermExam'
import { replacementRouter } from './rest-api/replacement'
import { midtermExamTypeRouter } from './rest-api/midtermExamType'
import { errorMiddleware } from './middleware/error'
import specializationRouter from './rest-api/specialization'
import { reportsRouter } from './rest-api/reports'

declare module 'express-serve-static-core' {
    interface Request {
        userId: number
    }
}

async function main() {
    const PORT = process.env.PORT || 4000
    const GRAPHQL_PATH = '/graphql'

    // init express application
    const app = express()
    const httpServer = http.createServer(app)

    // init gql schema
    const { typeDefs, resolvers } = createApolloServerProps()

    // init apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    app.use(cors<cors.CorsRequest>())
    app.use(express.json())
    app.use(authentication)

    // describe graphql api
    app.use(
        GRAPHQL_PATH,
        expressMiddleware(server, {
            context: async ({ req }) => ({
                userId: req.userId,
                prisma: db,
            }),
        })
    )

    // describe rest api
    app.use('/api/teacher', teacherRouter)
    app.use('/api/subgroup', subgroupRouter)
    app.use('/api/note', noteRouter)
    app.use('/api/consult', consultRouter)
    app.use('/api/groupConsult', groupConsultRouter)
    app.use('/api/journal', journalRouter)
    app.use('/api/user', userRouter)
    app.use('/api/midtermExam', midtermExamRouter)
    app.use('/api/midtermExamType', midtermExamTypeRouter)
    app.use('/api/replacement', replacementRouter)
    app.use('/api/specialization', specializationRouter)
    app.use('/api/reports', reportsRouter)

    app.use(errorMiddleware)
    // start http-server application
    await new Promise((resolve) => app.listen({ port: PORT }, resolve as () => void))
    console.log(`🚀 Server ready at http://localhost:4000${GRAPHQL_PATH}`)
}

main()
