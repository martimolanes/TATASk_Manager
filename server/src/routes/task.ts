import express from 'express';
import Task from '../models/task'

const router = express.Router();

router.get('/', async (_, res) => {
    const activities = await Task.getAll();
    res.json(activities);
});

export default router;
