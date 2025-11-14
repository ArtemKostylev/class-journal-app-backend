import pino from 'pino'

export const logger = pino(
    {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    pino.destination({
        dest: 1,
        sync: false,
    })
)
