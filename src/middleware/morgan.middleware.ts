import morgan, { StreamOptions } from 'morgan';
import { logger } from '../utils/logger.utils';

const stream: StreamOptions = {
    write: (message: string) => logger.info(message.trim())
};

export const morganMiddleware = morgan('combined', { stream });