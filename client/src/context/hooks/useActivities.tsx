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
      setActivities((currentActivities) => {
        const updatedActivities = response.data.reduce(
          (acc: Activity[], newActivity: Activity) => {
            const index = acc.findIndex((a) => a.id === newActivity.id);
            if (index > -1) {
              // Replace the existing activity with the new one directly from the response
              acc[index] = newActivity;
            } else {
              // Add new activity if not found
              acc.push(newActivity);
            }
            return acc;
          },
          [...currentActivities]
        );

        return updatedActivities;
      });

      console.log("Fetching activities...", response.data);
    } catch (err) {
      setError("Failed to fetch activities: ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const addActivity = async (activity: Activity) => {
    try {
      const response = await axios.post("http://localhost:3333/activities", {
        ...activity,
      });
      console.log("Adding activity...", response.data);
      fetchActivities();
    } catch {
      setError("Failed to add activity: ");
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      await axios.put(`http://localhost:3333/activities/${activity.id}`, {
        ...activity,
      });
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, ...activity } : a))
      );
    } catch (err) {
      setError("Failed to update activity: ");
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/activities/${id}`);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Failed to delete activity: ");
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
