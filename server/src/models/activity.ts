import pool from '../config/db.ts';

const Activity = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM Activity');
        return res.rows;
    }
};

export default Activity;
