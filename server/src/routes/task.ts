import express from 'express';
import { Task, Tag, Activity } from '../models';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'content', 'startDate', 'endDate'],
            include: [
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] },
                },
                {
                    model: Activity,
                    as: 'Activity'
                }

            ]
        }
        );
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contact = await Task.findByPk(req.params.id);
        res.json(contact);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
