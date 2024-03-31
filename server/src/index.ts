import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Status, Tag } from './models/models.ts';

dotenv.config();

const app = express();
app.use(cors());
const PORT: number = Number(process.env.PORT) || 3333;

const status = await Status.getById(1);
console.log(status);

const tag = await Tag.getById(1);
console.log(tag);

app.get('/', (_, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
