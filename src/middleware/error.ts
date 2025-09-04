import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorMiddleware = (
    err: Error,
    _: unknown,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    console.error(err.message)

    res.json({
        code: 1001,
        message: 'Непредвиденная ошибка приложения! Что-то пошло не так :(',
    })
}
