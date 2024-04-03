import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Tasks = () => {
  const { tasks, setTasks } = useData();
  const [newTask, setNewTask] = useState({ content: '', startDate: '', endDate: '', status: '', activityId: null });
  const [editMode, setEditMode] = useState({ id: null, status: false });

  return (
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
            <tr className="border-b border-gray-200 hover:bg-gray-100" key={task.id}>
              <td className="py-3 px-6 text-left whitespace-nowrap">{task.content}</td>
              <td className="py-3 px-6 text-left">{task.status}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => handleEditTask(task)} className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Form for adding or editing a task */}
      <div className="mt-4">
        {/* ... Your form inputs and buttons ... */}
      </div>
    </div>
  );
}

export default Tasks;
