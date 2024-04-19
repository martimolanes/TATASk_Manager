import { useData } from "../context/DataContext";

const Statistics = () => {
  const { tasks, activities } = useData();
  const now = new Date();

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.endDate && new Date(task.endDate) < now
  ).length; // Assuming completion is determined by endDate being in the past

  // Calculate activity statistics
  const totalActivities = activities.length;
  const completedActivities = activities.filter(
    (activity) => new Date(activity.endDate) < now
  ).length;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Total Tasks</h3>
          <p className="text-3xl">{totalTasks}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Completed Tasks</h3>
          <p className="text-3xl">{completedTasks}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Total Activities</h3>
          <p className="text-3xl">{totalActivities}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Completed Activities</h3>
          <p className="text-3xl">{completedActivities}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
