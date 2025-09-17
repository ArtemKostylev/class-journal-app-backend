import { db } from '~/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { LoginRequestDto } from '~/dto/user/login/request'
import { UserDataResponseDto } from '~/dto/user/getUserData/response'
import { ExpectedError } from '~/errors/ExpectedError'
import { ErrorCodes } from '~/errors/ErrorCodes'
import { getUserData } from '~/service/user/getUserData'

export async function login(params: LoginRequestDto): Promise<[string, UserDataResponseDto]> {
    const { login, password } = params
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('Login error: JWT_SECRET is not set in env file')
    }

    const user = await db.user.findFirst({
        where: {
            login,
        },
    })

    if (!user) {
        throw new ExpectedError(ErrorCodes.INVALID_CREDENTIALS, 'User with this login not found')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
        throw new ExpectedError(ErrorCodes.INVALID_CREDENTIALS, 'Password is incorrect')
    }

    const token = jwt.sign({ id: user.id }, secret)
    const response = await getUserData(user.id, user.roleId)

    return [token, response]
}
