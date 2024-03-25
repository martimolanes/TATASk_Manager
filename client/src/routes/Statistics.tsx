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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Tasks</h3>
            <p className="text-3xl">{stats.totalTasks}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Completed Tasks</h3>
            <p className="text-3xl">{stats.completedTasks}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Activities</h3>
            <p className="text-3xl">{stats.totalActivities}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Completed Activities</h3>
            <p className="text-3xl">{stats.completedActivities}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Statistics;
  