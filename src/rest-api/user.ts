import { Router, type CookieOptions } from 'express'
import { login, register } from '~/service/user'
import { StatusCodes } from 'http-status-codes'

const userRouter = Router()

userRouter.post('/login', async (req, res, next) => {
    try {
        const { login: loginParam, password } = req.body
        const [token, response] = await login({ login: loginParam, password })

        const cookieOptions: CookieOptions = {
            httpOnly: true,
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
        const { login, password, role } = req.body
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

export { userRouter }
