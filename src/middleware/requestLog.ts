import { NextFunction, Request } from 'express'
import { logger } from '~/utils/logger'

export const requestLog = (
    req: Request,
    _: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    logger.info({
        method: req.method,
        url: req.url,
        body: req.body,
    })
    next()
}
