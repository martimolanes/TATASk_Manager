import React, { useState } from 'react';
import { useData } from '../../context/DataContext';


const Activities = () => {
  const { activities, setActivities } = useData();
  const [activityTypes] = useState([
    { name: 'Job' },
    { name: 'School' },
    { name: 'Personal' },
  ]);

  const [newActivity, setNewActivity] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'Active', // Assuming a default status for simplicity
    activityType: ''
  });
  const [editMode, setEditMode] = useState({ id: null, status: false });

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.activityType) {
      const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
      setActivities(prevActivities => [...prevActivities, { ...newActivity, id: newId }]);
      setNewActivity({ name: '', startDate: '', endDate: '', status: 'Active', activityType: '' }); // Reset form
    }
  };
  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleEditActivity = (activity) => {
    setEditMode({ id: activity.id, status: true });
    setNewActivity({ ...activity });
  };

  const handleSaveEdit = () => {
    setActivities(activities.map(activity => activity.id === editMode.id ? { ...newActivity } : activity));
    setEditMode({ id: null, status: false });
    setNewActivity({ name: '', startDate: '', endDate: '', status: 'Active', activityType: '' }); // Reset form
  };

  // The rest of your component logic...

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Activities</h2>
    <ul>
      {activities.map((activity) => (
        <li key={activity.id} className="mb-2">
          <div>{activity.name} - Type: {activity.activityType}</div>
          <div>Start Date: {activity.startDate || 'N/A'}</div>
          <div>End Date: {activity.endDate || 'N/A'}</div>
          <button onClick={() => handleEditActivity(activity)} className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
          <button onClick={() => handleDeleteActivity(activity.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        </li>
      ))}
    </ul>
    <div className="mt-4">
        <input
          value={newActivity.name}
          onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
          placeholder="Activity Name"
          className="input"
        />
        {/* Additional form inputs for startDate, endDate, status, activityType */}
        <input
          type="date"
          value={newActivity.startDate}
          onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
          placeholder="Start Date"
          className="input"
        />
        <input
          type="date"
          value={newActivity.endDate}
          onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
          placeholder="End Date"
          className="input"
        />
        <select
          value={newActivity.activityType}
          onChange={(e) => setNewActivity({ ...newActivity, activityType: e.target.value })}
          className="input"
        >
          <option value="">Select Type</option>
          {activityTypes.map((type, index) => (
            <option key={index} value={type.name}>{type.name}</option>
          ))}
        </select>
        <button onClick={editMode.status ? handleSaveEdit : handleAddActivity} className="button">
          {editMode.status ? 'Save' : 'Add Activity'}
        </button>
      </div>
    </div>
  );
}

export default Activities;
