import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Activities = () => {
  const { activities, setActivities } = useData();
  const [activityTypes] = useState([
    { name: 'Job' },
    { name: 'School' },
    { name: 'Personal' },
  ]);

  // ... All your handler functions and state variables ...

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{activity.name}</h3>
            <p><strong>Type:</strong> {activity.activityType}</p>
            <p><strong>Start Date:</strong> {activity.startDate || 'N/A'}</p>
            <p><strong>End Date:</strong> {activity.endDate || 'N/A'}</p>
            <div className="mt-4">
              <button onClick={() => handleEditActivity(activity)} className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDeleteActivity(activity.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* Form for adding or editing an activity */}
      <div className="mt-4">
        {/* ... Your form inputs and buttons ... */}
      </div>
    </div>
  );
}

export default Activities;
