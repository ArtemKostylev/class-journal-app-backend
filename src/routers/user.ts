import { Router, type CookieOptions } from 'express'
import { getUserData, getUserList, getUserOptions, login, register } from '~/service/user'
import { StatusCodes } from 'http-status-codes'
import { userListRequestSchema } from '~/dto/user/list/request'
import { registerRequestSchema } from '~/dto/user/register/request'

const userRouter = Router()

userRouter.post('/login', async (req, res, next) => {
    try {
        const { login: loginParam, password } = req.body
        const [token, response] = await login({ login: loginParam, password })

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        }

        res.status(StatusCodes.OK).cookie('Auth', token, cookieOptions).send(response)
    } catch (error) {
        next(error)
    }
})

userRouter.post('/register', async (req, res, next) => {
    try {
        const { login, password, role } = registerRequestSchema.parse(req.body)
        await register({ login, password, role })
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

userRouter.post('/logout', async (req, res, next) => {
    try {
        res.clearCookie('Auth')
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/data', async (req, res, next) => {
    try {
        const { userId } = req
        const data = await getUserData(userId)
        res.send(data)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/list', async (req, res, next) => {
    try {
        const params = userListRequestSchema.parse(req.query)
        const data = await getUserList(params)
        res.send(data)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/options', async (_, res, next) => {
    try {
        const options = await getUserOptions()
        res.send(options)
    } catch (error) {
        next(error)
    }
})

export { userRouter }
