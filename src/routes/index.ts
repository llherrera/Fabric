import { Request, Response, Router } from 'express';
import { LoadRouter } from './loadfile.route';

const router = Router();

router.get('/', async (req : Request, res : Response) => {
    res.send('Hello World!');
});
router.get('/ping', async (req : Request, res : Response) => {
    res.send('ping!');
});

export {
    router as IndexRouter,
    LoadRouter,
};