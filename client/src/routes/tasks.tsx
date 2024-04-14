import React, { useContext, useState, useEffect } from "react";
import { Task, useData } from "../context/DataContext";
import { TabContext } from "../context/TabContext";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
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
  const tabs = ["Planning", "On Going", "Completed", "Paused"];

  return (
    <div className="flex space-x-2 mb-4 pl-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            console.log(`Setting active tab to ${tab}`);
            setActiveTab(tab);
          }}
          className={`px-5 py-3 rounded-b-lg ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"} hover:shadow-xl`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Tasks = () => {
  const { tasks, editTask, deleteTask } = useData();
  const { activeTab } = useContext(TabContext);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Set currentTask to the first task when tasks are loaded
    if (tasks.length > 0) {
      setCurrentTask(tasks[0]);
    }
  }, [tasks]);

  useEffect(() => {
    const newFilteredTasks = tasks.filter((task) => task.status === activeTab);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, activeTab]);

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setEditMode(true);
  };

  const handleDeleteTask = (taskId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (isConfirmed) {
      deleteTask(taskId);
    }
  };

  return (
    <>
      <Tabs />
      <Modal isOpen={editMode} onClose={() => setEditMode(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!currentTask) return;
            // Assuming editTask is implemented and available through useData
            editTask(currentTask);
            setEditMode(false);
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <input
              type="text"
              id="content"
              value={currentTask ? currentTask.content : ""}
              onChange={(e) =>
                currentTask &&
                setCurrentTask({ ...currentTask, content: e.target.value })
              }
              onFocus={(e) => e.target.select()}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          {/* Include other fields as necessary */}
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

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">{task.content}</h3>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(task.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(task.endDate).toLocaleDateString()}
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
        {/* Form for adding or editing a task */}
        <div className="mt-4">{/* ... Your form inputs and buttons ... */}</div>
      </div>
    </>
  );
};

export default Tasks;
