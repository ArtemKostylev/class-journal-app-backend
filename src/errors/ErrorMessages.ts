import { ErrorCodes } from './ErrorCodes'

export const ERROR_MESSAGES = {
    [ErrorCodes.INVALID_CREDENTIALS]: 'Неправильный логин или пароль',
    [ErrorCodes.UNKNOWN_ERROR]: 'Непредвиденная ошибка приложения! Что-то пошло не так :(',
}
