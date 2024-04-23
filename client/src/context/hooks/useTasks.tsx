import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Task } from "../DataContext";

export const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3333/tasks");
      setTasks(
        response.data.map((task: Task) => ({
          ...task,
          Tags: task.Tags || [],
        }))
      );
      console.log("Fetched tasks:", response.data);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: Task) => {
    try {
      console.log("task", task);
      await axios.post("http://localhost:3333/tasks", task);
      fetchTasks();
    } catch (err) {
      console.log(task);
      setError(err as Error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await axios.put(`http://localhost:3333/tasks/${task.id}`, task);
      console.log("updating task", task);
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) => {
          if (t.id === task.id) {
            const updatedTask = { ...t, ...task };
            return updatedTask;
          }
          return t;
        });

        return updatedTasks;
      });
    } catch (err) {
      setError(err as Error);
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
      console.log("Task deleted:", id);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
    error,
    fetchTasks,
  };
};
