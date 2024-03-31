import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'example',
    port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;
