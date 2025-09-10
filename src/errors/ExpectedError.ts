import type { ErrorCodes } from './ErrorCodes'

export class ExpectedError extends Error {
    code: ErrorCodes

    constructor(code: ErrorCodes, message: string) {
        super(message)
        this.code = code
    }
}
