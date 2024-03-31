import pool from "../config/db.ts"

export const Status = {
    getById: async (id: number) => {
        const res = await pool.query('SELECT * FROM Status WHERE Id = \$1', [id]);
        return res.rows[0];
    },
};

export const Tag = {
    getById: async (id: number) => {
        const res = await pool.query('SELECT * FROM Tag WHERE Id = \$1', [id]);
        return res.rows[0];
    },
};
