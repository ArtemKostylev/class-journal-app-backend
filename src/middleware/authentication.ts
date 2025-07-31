import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const secret = process.env.APP_SECRET;

interface JwtPayload {
    id: number;
}

const EXCLUDED_PATHS: string[] = [];

export function authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!secret) {
        throw new Error('Authentication middleware: JWT_SECRET is not defined in env file');
    }

    if (EXCLUDED_PATHS.includes(req.path)) {
        next();
        return;
    }

    const headers = req.headers;
    const authHeader: string | undefined = headers?.['authorization'];

    const signature = authHeader?.replace('Bearer ', '');

    if (!signature) {
        res.status(StatusCodes.UNAUTHORIZED).send();
        return;
    }

    try {
        const token: JwtPayload = jwt.verify(signature, secret) as JwtPayload;
        req.userId = token.id;
        next();
    } catch (err: unknown) {
        console.log(err);
        res.status(StatusCodes.UNAUTHORIZED).send();
    }
}
