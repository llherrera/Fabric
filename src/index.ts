import app from './app.ts';
import 'dotenv/config';

const port = process.env.OUT_PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});