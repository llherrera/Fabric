import app from './app';
import 'dotenv/config';

const port = process.env.OUT_PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});