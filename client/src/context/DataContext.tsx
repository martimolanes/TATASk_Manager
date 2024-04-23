import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { useTasks } from "./hooks/useTasks";
import { useActivities } from "./hooks/useActivities";
import { useTags } from "./hooks/useTags"; // Make sure to import useTags

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export interface Task {
  id?: number;
  name: string;
  content: string;
  startDate: string;
  endDate?: string;
  Tags: Tag[];
  activityid?: number | null; // Link to an activity
}

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
  tasks: Task[] | [];
  activities: Activity[] | [];
  tags: Tag[] | []; // Add tags to the context type
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setActivities: Dispatch<SetStateAction<Activity[]>>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
  addTag: (tag: Tag) => Promise<void>; // Function to add a tag
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks, setTasks, addTask, updateTask, deleteTask } = useTasks([]);
  const {
    activities,
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useActivities([]);
  const { tags, addTag, loading } = useTags(); // Use the useTags hook

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
        tags, // Provide tags through context
        addTag,
        loading, // Ensure loading state reflects all hooks
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
