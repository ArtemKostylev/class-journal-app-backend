import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { authentication } from './middleware/authentication'
import { teacherRouter } from './rest-api/teacher'
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
import { courseRouter } from './rest-api/course'
import { studentRouter } from './rest-api/student'
import { relationsRouter } from './rest-api/realtions'

declare module 'express-serve-static-core' {
    interface Request {
        userId: number
    }
}

async function main() {
    const PORT = process.env.PORT || 4000
    const app = express()

    app.use(cors<cors.CorsRequest>())
    app.use(express.json())
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
    console.log(`🚀 Server ready at http://localhost:4000`)
}

main()
