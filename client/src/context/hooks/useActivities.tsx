import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Activity } from "../DataContext";

export const useActivities = (initialActivities: Activity[]) => {
  const [activities, setActivities] = useState(initialActivities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/activities");
      setActivities(response.data);
      setLoading(false);
    } catch (err) {
      setError(err as null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const addActivity = async (activity: Activity) => {
    try {
      const response = await axios.post("/activities", activity);
      setActivities((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err as null);
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      await axios.put(`/activities/${activity.id}`, activity);
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, ...activity } : a))
      );
    } catch (err) {
      setError(err as null);
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      await axios.delete(`/activities/${id}`);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err as null);
    }
  };

  return {
    activities,
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    loading,
    error,
    fetchActivities,
  };
};
