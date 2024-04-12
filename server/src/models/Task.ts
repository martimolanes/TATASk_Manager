import sequelize from "../config/db.ts";
import dataTypes from 'sequelize';

// CREATE TABLE IF NOT EXISTS Task (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     content TEXT,
//     startDate TIMESTAMP,
//     endDate TIMESTAMP,
//     status INTEGER REFERENCES Status(Id),
//     activityId INTEGER REFERENCES Activity(Id)
// );

// Define the model
export const Task = sequelize.define('Task', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false
    },
    content: {
        type: dataTypes.TEXT
    },
    startDate: {
        type: dataTypes.DATE,
        field: 'startdate'
    },
    endDate: {
        type: dataTypes.DATE,
        field: 'enddate'
    },
}, { timestamps: false, tableName: 'task' });
