import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const Tasks = () => {
  const { tasks, setTasks } = useData(); // Destructure to access data and setData
    const [newTask, setNewTask] = useState({ content: '', startDate: '', endDate: '', status: '', activityId: null });
    const [editMode, setEditMode] = useState({ id: null, status: false });

    const handleAddTask = () => {
        if (newTask.content) {
            const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
            setTasks([...tasks, { ...newTask, id: newId }]);
            setNewTask({ content: '', startDate: '', endDate: '', status: '', activityId: null }); // Reset form
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = (task) => {
        setEditMode({ id: task.id, status: true });
        setNewTask({ ...task });
    };

    const handleSaveEdit = () => {
        setTasks(tasks.map(task => task.id === editMode.id ? { ...newTask } : task));
        setEditMode({ id: null, status: false });
        setNewTask({ content: '', startDate: '', endDate: '', status: '', activityId: null }); // Reset form
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="mb-2">
                        {task.content} - Status: {task.status}
                        <button onClick={() => handleEditTask(task)} className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                    </li>
                ))}
            </ul>
            {/* Form for adding or editing a task */}
            <div className="mt-4">
                <input
                    value={newTask.content}
                    onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                    placeholder="Task Content"
                    className="input"
                />
                {/* Additional inputs for startDate, endDate, status, activityId */}
                {/* Assuming a simple input for activityId for demonstration */}
                <input
                    type="number"
                    value={newTask.activityId || ''}
                    onChange={(e) => setNewTask({ ...newTask, activityId: e.target.value ? Number(e.target.value) : null })}
                    placeholder="Activity ID"
                    className="input"
                />
                <button onClick={editMode.status ? handleSaveEdit : handleAddTask} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    {editMode.status ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
        </div>
    );
}

export default Tasks;
