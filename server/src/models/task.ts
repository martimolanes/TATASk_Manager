import pool from '../config/db.ts';

const Task = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM Task');
        return res.rows;
    }
};

export default Task;
