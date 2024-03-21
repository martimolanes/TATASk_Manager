

const Statistics = () => {
  // Mock statistics
  const stats = {
    totalTasks: 10,
    completedTasks: 7,
    totalActivities: 5,
    completedActivities: 3,
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <p>Total Tasks: {stats.totalTasks}</p>
      <p>Completed Tasks: {stats.completedTasks}</p>
      <p>Total Activities: {stats.totalActivities}</p>
      <p>Completed Activities: {stats.completedActivities}</p>
    </div>
  );
}

export default Statistics;
