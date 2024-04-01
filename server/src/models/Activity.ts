import sequelize from '../config/db.ts';
import dataTypes from 'sequelize';

// CREATE TABLE IF NOT EXISTS Activity (
// id SERIAL PRIMARY KEY,
// title VARCHAR(255) NOT NULL,
// description TEXT,
// url VARCHAR(255),
// startDate TIMESTAMP,
// endDate TIMESTAMP,
// status INTEGER REFERENCES Status(Id),
// activityType INTEGER REFERENCES ActivityType(Id)
// );

// Define the model
export const Activity = sequelize.define('Activity', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: dataTypes.STRING,
        allowNull: false
    },
    description: {
        type: dataTypes.TEXT
    },
    url: {
        type: dataTypes.STRING
    },
    startDate: {
        type: dataTypes.DATE,
        field: 'startdate'
    },
    endDate: {
        type: dataTypes.DATE,
        field: 'enddate'
    },
}, {
    timestamps: false,
    tableName: 'activity'
});
