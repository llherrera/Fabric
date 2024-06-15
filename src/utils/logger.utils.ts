const { createLogger, format, transports } = require('winston');

interface Props {
    timestamp: Date,
    level: string,
    message: string
}

export const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message}: Props) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new transports.File({ filename: `${__dirname}/../../logs/error.log`, level: 'error' }),
        new transports.File({ filename: `${__dirname}/../../logs/registros.log`, level: 'info' }),
    ],
});

