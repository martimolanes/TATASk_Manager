import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Tag } from "../DataContext";

export const useTags = () => {
  const [tags, setTags] = useState<Tag[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3333/tags"); // Adjust the URL as needed
      setTags(response.data);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const addTag = async (newTag: Tag) => {
    try {
      await axios.post("http://localhost:3333/tags", newTag);
      setTags((prevTags: Tag[]) => [...prevTags, newTag]); // Optionally re-fetch the tags list to include server-side updates
    } catch (err) {
      setError(err as Error);
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
