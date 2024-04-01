import express from 'express';
import Activity from '../models/activity';

const router = express.Router();

router.get('/', async (_, res) => {
    const activities = await Activity.getAll();
    res.json(activities);
});

export default router;
