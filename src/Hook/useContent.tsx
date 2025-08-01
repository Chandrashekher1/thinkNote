import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    setContents(json?.content || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { contents, loading, fetchContent };
}
