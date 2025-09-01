import { db } from '~/db'
import { RegisterRequestDto } from '~/dto/user/register/request'
import bcrypt from 'bcrypt'

export async function register(params: RegisterRequestDto): Promise<void> {
    const { login, password, role } = params

    const encryptedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
        data: { login, password: encryptedPassword, role: { connect: { id: role } } },
    })
}
