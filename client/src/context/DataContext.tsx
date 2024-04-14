import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { useTasks } from "./hooks/useTasks"; // Assuming these hooks are in a folder called hooks
import { useActivities } from "./hooks/useActivities";

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

interface DataContextType {
  tasks: Task[];
  activities: Activity[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setActivities: Dispatch<SetStateAction<Activity[]>>;
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (activity: Activity) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  tasks: initialTasks,
  activities: initialActivities,
  setTasks: () => {},
  addTask: () => new Promise(() => {}),
  updateTask: () => new Promise(() => {}),
  deleteTask: () => new Promise(() => {}),
  setActivities: () => {},
  addActivity: () => new Promise(() => {}),
  updateActivity: () => new Promise(() => {}),
  deleteActivity: () => new Promise(() => {}),
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks, setTasks, addTask, updateTask, deleteTask } =
    useTasks(initialTasks);
  const {
    activities,
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
