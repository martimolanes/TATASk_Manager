import sequelize from '../config/db.ts';
import dataTypes from 'sequelize';

// CREATE TABLE IF NOT EXISTS ActivityType (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL
// );

// Define the model
export const ActivityType = sequelize.define('ActivityType', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'activitytype'
});
