import pino from 'pino'

export const logger = pino(
    {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    pino.destination({
        dest: process.env.LOG_FILE || 'logs.log',
        sync: true,
    })
)
