import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ErrorCodes } from '~/errors/ErrorCodes'
import { ERROR_MESSAGES } from '~/errors/ErrorMessages'
import { ExpectedError } from '~/errors/ExpectedError'

export const errorMiddleware = (
    err: Error,
    _: unknown,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    console.error(err.message)

    if (err instanceof ExpectedError) {
        res.status(StatusCodes.BAD_REQUEST)
        res.json({
            code: err.code,
            message: ERROR_MESSAGES[err.code],
        })
        return
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({
        code: ErrorCodes.UNKNOWN_ERROR,
        message: ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR],
    })
}
