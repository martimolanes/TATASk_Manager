import sequelize from "../config/db";
import dataTypes from 'sequelize';

// CREATE TABLE IF NOT EXISTS Status (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     style VARCHAR(255)
// );

// Define the model
export const Status = sequelize.define('Status', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: dataTypes.STRING,
        allowNull: false
    },
    style: {
        type: dataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'status'
});
