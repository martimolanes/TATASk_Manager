import React, { createContext, useContext, useState } from "react";

export type Task = {
  id: number;
  content: string;
  startDate: string;
  endDate: string;
  status: string;
  activityId: number;
};

export type Activity = {
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
  editActivity: (updatedActivity: Activity) => void;
  deleteActivity: (activityId: number) => void;
  editTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const initialTasks: Task[] = [
  {
    id: 1,
    content: "Frontend to Backend API Integration",
    startDate: "2024-04-14",
    endDate: "2024-04-26",
    status: "Planning",
    activityId: 1,
  },
  {
    id: 2,
    content: "Complete project documentation",
    startDate: "2024-03-20",
    endDate: "2024-04-26",
    status: "On Going",
    activityId: 1,
  },
  {
    id: 3,
    content: "Work on web design",
    startDate: "2024-03-20",
    endDate: "2024-04-26",
    status: "Paused",
    activityId: 1,
  },
  {
    id: 3,
    content: "Review PR from John",
    startDate: "2024-03-21",
    endDate: "2024-03-22",
    status: "Completed",
    activityId: 2,
  },
];

const initialActivities: Activity[] = [
  {
    id: 1,
    name: "Project Work",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "Active",
    activityType: "Job",
  },
  {
    id: 2,
    name: "Study Session",
    startDate: "2024-03-20",
    status: "Active",
    activityType: "School",
  },
];

const DataContext = createContext<DataContextType>({
  tasks: [],
  setTasks: () => {},
  activities: [],
  setActivities: () => {},
  editActivity: () => {},
  deleteActivity: () => {},
  editTask: () => {},
  deleteTask: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const editActivity = (updatedActivity: Activity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  const deleteActivity = (activityId: number) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== activityId)
    );
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        setTasks,
        activities,
        setActivities,
        editActivity,
        deleteActivity,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
