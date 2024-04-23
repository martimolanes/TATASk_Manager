import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useData } from "../context/DataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

const Statistics = () => {
  const { tasks, activities } = useData();
  const now = new Date();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.endDate && new Date(task.endDate) < now
  ).length;
  const ongoingTasks = tasks.filter(
    (task) => !task.endDate || new Date(task.endDate) >= now
  ).length;

  const totalActivities = activities.length;
  const completedActivities = activities.filter(
    (activity) => new Date(activity.endDate) < now
  ).length;

  // Bar Chart Data
  const taskData = {
    labels: ["Total Tasks", "Completed Tasks", "Ongoing Tasks"],
    datasets: [
      {
        label: "Task Count",
        data: [totalTasks, completedTasks, ongoingTasks],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const activityData = {
    labels: ["Total Activities", "Completed Activities"],
    datasets: [
      {
        label: "Activity Count",
        data: [totalActivities, completedActivities],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold m-4">Statistics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 m-12">
        {/* Summaries */}
        {/* Adjust each card to be more compact */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 shadow rounded p-3 text-white">
          <h3 className="text-md font-bold">Total Tasks</h3>
          <p className="text-2xl">{totalTasks}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-300 shadow rounded p-3 text-white">
          <h3 className="text-md font-bold">Completed Tasks</h3>
          <p className="text-2xl">{completedTasks}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-300 shadow rounded p-3 text-white">
          <h3 className="text-md font-bold">Total Activities</h3>
          <p className="text-2xl">{totalActivities}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-300 shadow rounded p-3 text-white">
          <h3 className="text-md font-bold">Completed Activities</h3>
          <p className="text-2xl">{completedActivities}</p>
        </div>
        {/* Charts */}

        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-3">
            <Bar
              data={taskData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-3">
            <Pie
              data={activityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
