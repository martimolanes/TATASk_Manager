import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const PORT: number = Number(process.env.PORT) || 3333;

app.get('/', (_, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
