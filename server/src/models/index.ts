import { Activity } from './Activity';
import { ActivityType } from './ActivityType';
import { Status } from './Status';
import { Task } from './Task';
import { Tag } from './Tag';
import { TaskTag } from './TaskTag';

Activity.belongsTo(ActivityType, { foreignKey: 'activitytype' });
Activity.belongsTo(Status, { foreignKey: 'status' });
Activity.hasMany(Task, {
    foreignKey: 'activityid'
});
Task.belongsTo(Activity, {
    foreignKey: 'activityid'
});
Task.belongsToMany(Tag, {
    through: TaskTag,
    foreignKey: 'taskid',
});
Tag.belongsToMany(Task, {
    through: TaskTag,
    foreignKey: 'tagid',
});

export {
    Activity,
    ActivityType,
    Status,
    Task,
    Tag,
};

