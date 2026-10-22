import { useCallback, useEffect, useState } from "react";

const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(PHOTOS_URL);
      if (!res.ok) throw new Error(`The API answered with status ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Unexpected API response");
      setPhotos(data);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching photos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { photos, loading, error, retry: load };
}
