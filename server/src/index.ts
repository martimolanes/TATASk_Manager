import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRouter from './routes/task';
import activityRouter from './routes/activity';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT: number = Number(process.env.PORT) || 3333;

app.get('/', (_, res) => {
    res.send('Hello World');
});

app.use('/tasks', taskRouter);
app.use('/activities', activityRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
