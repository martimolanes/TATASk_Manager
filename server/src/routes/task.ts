import express from 'express';
import { Task, Tag, TaskTag } from '../models';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'content', 'startDate', 'endDate', 'activityid'],
            include: [
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] },
                },
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
        const contact = await Task.findByPk(req.params.id, {
            attributes: ['id', 'name', 'content', 'startDate', 'endDate', 'activityid'],
            include: [
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] },
                },
            ]
        });
        res.json(contact);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const task = await Task.create(body);

        if (body.Tags && body.Tags.length > 0) {
            for (const tag of body.Tags) {
                const [tagInstance] = await Tag.findOrCreate({ where: { name: tag.name } });
                await TaskTag.create({ taskid: task.get('id'), tagid: tagInstance.get('id') });
            }
        }
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { body, params } = req;

        await Task.update(body, {
            where: { id: params.id },
        });

        if (body.Tags && body.Tags.length > 0) {
            await TaskTag.destroy({ where: { taskid: params.id } });

            for (const tag of body.Tags) {
                const [tagInstance] = await Tag.findOrCreate({ where: { name: tag.name } });
                await TaskTag.create({ taskid: params.id, tagid: tagInstance.get('id') });
            }
        }

        res.status(204).json({ message: 'Task updated' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Task.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Task deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
