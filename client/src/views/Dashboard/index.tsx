import React from 'react';
import { useData } from '../../context/DataContext'; // Adjust the import path as necessary

const Dashboard = () => {
  const { tasks, activities } = useData(); // Destructure tasks and activities from context

  // Compute summaries
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  const totalActivities = activities.length;
  const upcomingActivities = activities.filter(activity => new Date(activity.startDate) > new Date()).length;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Welcome to the Dashboard!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2 text-blue-900">Tasks Overview</h3>
          <p className="text-lg text-blue-900">Total: <span className="font-semibold text-black">{totalTasks}</span></p>
          <p className="text-lg text-blue-900">Completed: <span className="font-semibold text-black">{completedTasks}</span></p>
          <p className="text-lg text-blue-900">Pending: <span className="font-semibold text-black">{pendingTasks}</span></p>
        </div>
        <div className="bg-green-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2 text-green-900">Activities Overview</h3>
          <p className="text-lg text-green-900">Total: <span className="font-semibold text-black">{totalActivities}</span></p>
          <p className="text-lg text-green-900">Upcoming: <span className="font-semibold text-black">{upcomingActivities}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
