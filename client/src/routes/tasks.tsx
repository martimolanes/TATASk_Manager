import React, { useState } from "react";
import { Task, useData } from "../context/DataContext";

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

const Tasks = () => {
  const { tasks, editTask, deleteTask } = useData();
  const [currentTask, setCurrentTask] = useState<Task>(tasks[0]);
  const [editMode, setEditMode] = useState(false);

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setEditMode(true);
  };

  const handleDeleteTask = (taskId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      deleteTask(taskId);
    }
  };

  return (
    <>
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
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Content</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tasks.map((task) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={task.id}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {task.content}
                </td>
                <td className="py-3 px-6 text-left">{task.status}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Form for adding or editing a task */}
        <div className="mt-4">{/* ... Your form inputs and buttons ... */}</div>
      </div>
    </>
  );
};

export default Tasks;
