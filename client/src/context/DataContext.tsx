import React, { createContext, useContext, useState } from 'react';

// Initial mock data separated into tasks and activities
const initialTasks = [
  { id: 1, content: 'Complete project documentation', startDate: '2024-03-20', endDate: '2024-03-25', status: 'In Progress', activityId: 1 },
  { id: 2, content: 'Review PR from John', startDate: '2024-03-21', endDate: '2024-03-22', status: 'New', activityId: 2 },
];

const initialActivities = [
  { id: 1, name: 'Project Work', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Active', activityType: 'Job' },
  { id: 2, name: 'Study Session', startDate: '2024-03-20', status: 'Active', activityType: 'School' },
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activities, setActivities] = useState(initialActivities);

  return (
    <DataContext.Provider value={{ tasks, setTasks, activities, setActivities }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => useContext(DataContext);
