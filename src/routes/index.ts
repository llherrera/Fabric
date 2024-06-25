import { Request, Response, Router } from 'express';
import { LoadRouter } from './loadfile.route';
import { orderRouter } from './order.route';
import { logger } from '../utils/logger.utils';
//const {  } = require('pino-http')()

const router = Router();

router.get('/', async (req : Request, res : Response) => {
    logger.info('Hello world');
    res.send('Hello World!');
});
router.get('/ping', async (req : Request, res : Response) => {
    res.send('ping!');
});

export {
    router as IndexRouter,
    LoadRouter,
    orderRouter,
};