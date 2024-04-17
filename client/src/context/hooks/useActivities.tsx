import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Activity } from "../DataContext";

export const useActivities = (initialActivities: Activity[]) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3333/activities");
      // Assuming the response data is correctly formatted and directly usable
      setActivities(
        response.data.map((activity: any) => ({
          ...activity,
          startDate: activity.startDate,
          endDate: activity.endDate,
          activityType: activity.ActivityType,
          status: activity.Status,
          tags: activity.Tags,
        }))
      );

      console.log(
        "Fetching activities...",
        response.data.map((activity: any) => ({
          ...activity,
          startDate: activity.startDate,
          endDate: activity.endDate,
          activityType: activity.ActivityType,
          status: activity.Status,
          tags: activity.Tags,
        }))
      );
    } catch (err) {
      setError("Failed to fetch activities: " + err.message); // More descriptive error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const addActivity = async (activity: Activity) => {
    try {
      const response = await axios.post("/activities", {
        ...activity,
        ActivityType: activity.activityType,
        Status: activity.status,
        Tags: activity.tags,
      });
      setActivities((prev) => [...prev, response.data]);
    } catch (err) {
      setError("Failed to add activity: " + err.message);
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      await axios.put(`/activities/${activity.id}`, {
        ...activity,
        ActivityType: activity.activityType,
        Status: activity.status,
        Tags: activity.tags,
      });
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, ...activity } : a))
      );
    } catch (err) {
      setError("Failed to update activity: " + err.message);
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      await axios.delete(`/activities/${id}`);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Failed to delete activity: " + err.message);
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
