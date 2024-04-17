import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { useTasks } from "./hooks/useTasks"; // Assuming these hooks are in a folder called hooks
import { useActivities } from "./hooks/useActivities";

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type Task = {
  id: number;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  activityId: number;
  tags: Tag[];
};

export type Activity = {
  id?: number;
  title: string;
  description: string;
  url?: string;
  startDate: string;
  endDate: string;
  ActivityType: {
    id?: number;
    name: string;
  };
  Status: {
    id?: number;
    title: string;
    style: string;
  };
  Tags: Tag[];
};

interface DataContextType {
  tasks: Task[];
  activities: Activity[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setActivities: Dispatch<SetStateAction<Activity[]>>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
  loading: boolean; // Add loading to the context
}

const initialTasks: Task[] = [
  // Add your initial tasks here if needed, mapped to the new structure
];

const initialActivities: Activity[] = [
  // Add your initial activities here if needed, mapped to the new structure
];

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks, setTasks, addTask, updateTask, deleteTask } =
    useTasks(initialTasks);
  const {
    activities,
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    loading, // Destructure loading from useActivities
  } = useActivities(initialActivities);

  return (
    <DataContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        activities,
        setActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        loading, // Provide loading state through context
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
