import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Task } from "../DataContext";

export const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err as null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: Task) => {
    try {
      const response = await axios.post("/tasks", task);
      setTasks((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err as null);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await axios.put(`/tasks/${task.id}`, task);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } catch (err) {
      setError(err as null);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err as null);
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
