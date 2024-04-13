import sequelize from "../config/db";
import dataTypes from 'sequelize';

// CREATE TABLE IF NOT EXISTS Tag (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     color VARCHAR(255)
// );

// Define the model
export const Tag = sequelize.define('Tag', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false
    },
    color: {
        type: dataTypes.STRING
    }
}, { timestamps: false, tableName: 'tag' });

