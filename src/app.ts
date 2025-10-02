import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { authentication } from './middleware/authentication'
import { teacherRouter } from './routers/teacher'
import subgroupRouter from './routers/subgroup'
import { noteRouter } from './routers/note'
import { consultRouter } from './routers/consult'
import { groupConsultRouter } from './routers/groupConsult'
import { journalRouter } from './routers/journal'
import { userRouter } from './routers/user'
import { midtermExamRouter } from './routers/midtermExam'
import { replacementRouter } from './routers/replacement'
import { midtermExamTypeRouter } from './routers/midtermExamType'
import { errorMiddleware } from './middleware/error'
import specializationRouter from './routers/specialization'
import { reportsRouter } from './routers/reports'
import { courseRouter } from './routers/course'
import { studentRouter } from './routers/student'
import { relationsRouter } from './routers/relations'
import { requestLog } from './middleware/requestLog'
import { cookieParser } from './middleware/cookieParser'
import { logger } from './utils/logger'

declare module 'express-serve-static-core' {
    interface Request {
        userId: number
    }
}

async function main() {
    const PORT = process.env.PORT || 4000
    const app = express()

    app.use(
        cors<cors.CorsRequest>({
            origin: process.env.NODE_ENV === 'production' ? 'https://akostylev.com' : 'http://localhost:3000',
            credentials: true,
        })
    )
    app.use(express.json())
    app.use(cookieParser)
    app.use(requestLog)
    app.use(authentication)

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
    app.use('/api/course', courseRouter)
    app.use('/api/student', studentRouter)
    app.use('/api/relations', relationsRouter)

    app.use(errorMiddleware)

    await new Promise((resolve) => app.listen({ port: PORT }, resolve as () => void))
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🚀 Server ready at http://localhost:4000`)
    } else {
        logger.info(`SERVER STARTED`)
    }
}

main()
