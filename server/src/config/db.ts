import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'example'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'postgres'}`
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
