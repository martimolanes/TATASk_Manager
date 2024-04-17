import express from 'express';
import { Tag } from '../models';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const tag = await Tag.create(body);
        res.status(201).json(tag);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
