import React, { createContext, useContext, useState } from 'react';

type Task = {
  id: number;
  content: string;
  startDate: string;
  endDate: string;
  status: string;
  activityId: number;
};

type Activity = {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
  status: string;
  activityType: string;
};

type DataContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

const initialTasks: Task[] = [
  { id: 1, content: 'Complete project documentation', startDate: '2024-03-20', endDate: '2024-03-25', status: 'In Progress', activityId: 1 },
  { id: 2, content: 'Review PR from John', startDate: '2024-03-21', endDate: '2024-03-22', status: 'New', activityId: 2 },
];

const initialActivities: Activity[] = [
  { id: 1, name: 'Project Work', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Active', activityType: 'Job' },
  { id: 2, name: 'Study Session', startDate: '2024-03-20', status: 'Active', activityType: 'School' },
];

const DataContext = createContext<DataContextType>({
  tasks: [],
  setTasks: () => {},
  activities: [],
  setActivities: () => {},
});

export const DataProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  return (
    <DataContext.Provider value={{ tasks, setTasks, activities, setActivities }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
