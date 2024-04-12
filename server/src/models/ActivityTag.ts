import sequelize from "../config/db.ts";

// Junction table
export const ActivityTag = sequelize.define('ActivityTag', {
    // No need to define primary keys here since they are foreign keys
}, { timestamps: false, tableName: 'activitytag' });
