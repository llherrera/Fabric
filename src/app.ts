import express from 'express';
import cors from 'cors';
import * as router from './routes';
import { Path } from './utils/constants';

const app = express();


app.use(cors());
app.use(express.json());


app.use(Path.Base, router.IndexRouter);

app.use((req, res) => {
    res.status(404).json({ msg: 'Not found' });
});


export default app;
