import express from 'express';
import { Activity, ActivityType, Status, Tag, ActivityTag } from '../models'

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
                },
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] },
                },
            ]
        });
        res.json(activity);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { params } = req;
        const activity = await Activity.findByPk(params.id, {
            attributes: ['id', 'title', 'description', 'url', 'startDate', 'endDate'],
            include: [
                {
                    model: ActivityType,
                    as: 'ActivityType'
                },
                {
                    model: Status,
                    as: 'Status'
                },
                {
                    model: Tag,
                    as: 'Tags',
                    through: { attributes: [] },
                },
            ]
        });
        res.json(activity);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const activity = await Activity.create(body);

        if (body.ActivityType) {
            const [activityType] = await ActivityType.findOrCreate({ where: { name: body.ActivityType.name } });
            await Activity.update({ activitytype: activityType.get('id') }, { where: { id: activity.get('id') } });
        }

        if (body.Status) {
            const [status] = await Status.findOrCreate({ where: { title: body.Status.title } });
            await Activity.update({ status: status.get('id') }, { where: { id: activity.get('id') } });
        }

        if (body.Tags && body.Tags.length > 0) {
            for (const tag of body.Tags) {
                const [tagInstance] = await Tag.findOrCreate({ where: { name: tag.name } });
                await ActivityTag.create({ activityid: activity.get('id'), tagid: tagInstance.get('id') });
            }
        }
        res.status(201).json({ message: 'Activity created' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { body, params } = req;

        await Activity.update(body, {
            where: { id: params.id },
        });

        if (body.ActivityType) {
            const [activityType] = await ActivityType.findOrCreate({ where: { name: body.ActivityType.name } });
            await Activity.update({ activitytype: activityType.get('id') }, { where: { id: params.id } });
        }

        if (body.Status) {
            const [status] = await Status.findOrCreate({ where: { title: body.Status.title } });
            await Activity.update({ status: status.get('id') }, { where: { id: params.id } });
        }

        await ActivityTag.destroy({ where: { activityid: params.id } });
        if (body.Tags && body.Tags.length > 0) {
            for (const tag of body.Tags) {
                const [tagInstance] = await Tag.findOrCreate({ where: { name: tag.name } });
                await ActivityTag.create({ activityid: params.id, tagid: tagInstance.get('id') });
            }
        }
        res.status(204).json({ message: 'Activity updated' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Activity.destroy({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: 'Activity deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
