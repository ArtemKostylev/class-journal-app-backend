import { Request, Response, NextFunction } from 'express'

export function cookieParser(req: Request, res: Response, next: NextFunction) {
    const cookieHeader = req.headers.cookie

    if (!cookieHeader) {
        req.cookies = {}
        return next()
    }

    const cookies: Record<string, string> = {}
    cookieHeader.split(';').forEach((cookie) => {
        const [name, value] = cookie.trim().split('=')
        if (name && value) {
            cookies[name] = decodeURIComponent(value)
        }
    })

    req.cookies = cookies
    next()
}
