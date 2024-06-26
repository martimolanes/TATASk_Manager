import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { tasks, activities } = useData();
  const now = new Date();

  // Compute summaries for tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.endDate && new Date(task.endDate) < now
  ).length;
  const pendingTasks = totalTasks - completedTasks; // Tasks that are not completed

  // Compute summaries for activities
  const totalActivities = activities.length;
  const upcomingActivities = activities.filter(
    (activity) => new Date(activity.startDate) > now
  ).length;
  const pastActivities = totalActivities - upcomingActivities;

  // Calculate progress percentages
  const taskProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activityProgress =
    totalActivities > 0
      ? Math.round((upcomingActivities / totalActivities) * 100)
      : 0;

  return (
    <div className="p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome to the Task Manager Dashboard!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="bg-blue-200 p-6 rounded-lg shadow-lg m-2">
          <h3 className="text-2xl font-semibold mb-2 text-blue-900">
            Tasks Overview
          </h3>
          <p className="text-lg text-blue-900">
            Total:{" "}
            <span className="font-semibold text-black">{totalTasks}</span>
          </p>
          <p className="text-lg text-blue-900">
            Completed:{" "}
            <span className="font-semibold text-black">{completedTasks}</span>
          </p>
          <p className="text-lg text-blue-900">
            Pending:{" "}
            <span className="font-semibold text-black">{pendingTasks}</span>
          </p>
          <div className="h-2 mt-4 bg-blue-400 rounded">
            <div
              style={{ width: `${taskProgress}%` }}
              className="h-full bg-blue-700 rounded"
            ></div>
          </div>
        </div>
        <div className="bg-green-200 p-6 rounded-lg shadow-lg m-2">
          <h3 className="text-2xl font-semibold mb-2 text-green-900">
            Activities Overview
          </h3>
          <p className="text-lg text-green-900">
            Total:{" "}
            <span className="font-semibold text-black">{totalActivities}</span>
          </p>
          <p className="text-lg text-green-900">
            Upcoming:{" "}
            <span className="font-semibold text-black">
              {upcomingActivities}
            </span>
          </p>
          <p className="text-lg text-green-900">
            Past:{" "}
            <span className="font-semibold text-black">{pastActivities}</span>
          </p>
          <div className="h-2 mt-4 bg-green-400 rounded">
            <div
              style={{ width: `${activityProgress}%` }}
              className="h-full bg-green-700 rounded"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
