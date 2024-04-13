import sequelize from "../config/db.ts";

// Junction table
export const TaskTag = sequelize.define('TaskTag', {
    // No need to define primary keys here since they are foreign keys
}, { timestamps: false, tableName: 'tasktag' });
