import { Activity } from './Activity';
import { ActivityType } from './ActivityType';
import { Status } from './Status';
import { Task } from './Task';
import { Tag } from './Tag';

Activity.belongsTo(ActivityType, { foreignKey: 'activitytype' });
Activity.belongsTo(Status, { foreignKey: 'status' });
Task.belongsTo(Activity, { foreignKey: 'activitytag' });
Task.belongsToMany(Tag, { through: 'tasktags' });
Tag.belongsToMany(Task, { through: 'tasktags' });

export {
    Activity,
    ActivityType,
    Status,
    Task,
    Tag,
};

