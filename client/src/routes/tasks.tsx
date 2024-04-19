import React, { useContext, useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { TabContext } from "../context/TabContext";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
        <button className="float-right text-xl font-semibold" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const Tabs = () => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const tabs = ["All Tasks", "Planning", "On Going", "Completed"]; // Updated tabs array
  return (
    <div className="flex space-x-2 mb-4 pl-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-3 rounded-b-lg ${
            activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:shadow-xl`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, loading } = useData();
  const { activeTab } = useContext(TabContext);
  const [currentTask, setCurrentTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const now = new Date();
    const newFilteredTasks = tasks.filter((task) => {
      const startDate = new Date(task.startDate);
      const endDate = task.endDate ? new Date(task.endDate) : null;
      switch (activeTab) {
        case "All Tasks":
          return task;
        case "Planning":
          return startDate > now;
        case "On Going":
          return startDate <= now && (!endDate || endDate >= now);
        case "Completed":
          return endDate && endDate < now;
        default:
          return task;
      }
    });
    setCurrentTask(newFilteredTasks.length > 0 ? newFilteredTasks[0] : null);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, activeTab]);

  const handleNewTask = () => {
    setCurrentTask({
      name: "",
      content: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      id: undefined,
    });
    setEditMode(true);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const handleEditTask = (task) => {
    const editedTask = {
      ...task,
      startDate: formatDate(task.startDate),
      endDate: formatDate(task.endDate),
    };
    setCurrentTask(editedTask);
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTask && currentTask.id) {
      await updateTask(currentTask);
    } else {
      await addTask({ ...currentTask, activityId: 1 });
    }
    setEditMode(false);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const getTaskColor = (task) => {
    const now = new Date();
    const startDate = new Date(task.startDate);
    const endDate = task.endDate ? new Date(task.endDate) : null;
    if (endDate && endDate < now) {
      return "bg-green-200";
    } else if (startDate > now) {
      return "bg-blue-200";
    } else {
      return "bg-yellow-200";
    }
  };

  return (
    <>
      <Tabs />
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <>
          <Modal isOpen={editMode} onClose={() => setEditMode(false)}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={currentTask ? currentTask.name : ""}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, name: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={currentTask ? currentTask.content : ""}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, content: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={currentTask ? currentTask.startDate : ""}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      startDate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={currentTask ? currentTask.endDate : ""}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, endDate: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="flex items-center justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
          <button
            onClick={handleNewTask}
            className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Task
          </button>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`shadow rounded-lg p-4 ${getTaskColor(task)}`}
                >
                  <h3 className="text-lg font-bold mb-2">{task.name}</h3>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(task.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {task.endDate
                      ? new Date(task.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Tasks;
