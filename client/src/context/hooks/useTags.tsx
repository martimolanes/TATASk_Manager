import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3333/tags"); // Adjust the URL as needed
      setTags(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const addTag = async (newTag) => {
    try {
      await axios.post("http://localhost:3333/tags", newTag);
      setTags((prevTags) => [...prevTags, newTag]); // Optionally re-fetch the tags list to include server-side updates
    } catch (err) {
      setError(err);
    }
  };

  return {
    tags,
    setTags,
    addTag,
    fetchTags,
    loading,
    error,
  };
};
