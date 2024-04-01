import express from 'express';
import { Activity, ActivityType, Status } from '../models'

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const activity = await Activity.findAll({
            attributes: ['id', 'title', 'description', 'url', 'startDate', 'endDate'],
            include: [
                {
                    model: ActivityType,
                    as: 'ActivityType'
                },
                {
                    model: Status,
                    as: 'Status'
                }
            ]
        });
        res.json(activity);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
