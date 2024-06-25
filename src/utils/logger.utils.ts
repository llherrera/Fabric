const { createLogger, format, transports } = require('winston');
const winston = require('winston');
require('winston-daily-rotate-file');

interface Props {
    timestamp: Date,
    level: string,
    message: string
}

var transport = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

export const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message}: Props) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new transports.File({ filename: `${__dirname}/../../logs/error.log`, level: 'error' }),
        transport
    ],
});

//new transports.File({ filename: `${__dirname}/../../logs/registros.log` }),