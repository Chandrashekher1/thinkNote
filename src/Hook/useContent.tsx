import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "@/config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token") || "";

  const fetchContents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/content/api/v1/content`, {
        headers: { Authorization: `${token}` },
      });
      const data = await res.json();
      if (data) {
        setContents(data);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);
  

  console.log(contents);
  

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { contents, loading, refetch: fetchContents };
}
