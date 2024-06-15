import express from 'express';
import cors from 'cors';
import * as router from './routes/index';
import { Path } from './utils/constants';
import { morganMiddleware } from './middleware';

const app = express();


app.use(cors());
app.use(express.json());
app.use(morganMiddleware);


app.use(Path.Base, router.IndexRouter);
app.use(Path.Load, router.LoadRouter);
app.use(Path.Order, router.orderRouter);

app.use((req, res) => {
    res.status(404).json({ msg: 'Not found' });
});


export default app;
