import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { logger } from '~/utils/logger'

interface JwtPayload {
    id: number
}

const EXCLUDED_PATHS: string[] = ['/api/user/login']

export function authentication(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('Authentication middleware: JWT_SECRET is not defined in env file')
    }

    if (EXCLUDED_PATHS.includes(req.path)) {
        next()
        return
    }

    const cookies = req.cookies
    const signature: string | undefined = cookies?.['Auth']

    if (!signature) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
        return
    }

    try {
        const token: JwtPayload = jwt.verify(signature, secret) as JwtPayload
        req.userId = token.id
        next()
    } catch (err: unknown) {
        logger.error(err)
        res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
}
