import { useState, useEffect, useCallback } from "react";
import { layThongBaoLoi } from "../utils/apiError";

export function useFetch(fetchFn, options = {}) {
  const { initialData = null, autoFetch = true } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      return result;
    } catch (err) {
      setError(layThongBaoLoi(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      const timeoutId = setTimeout(() => {
        execute().catch(() => {});
      }, 0);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [execute, autoFetch]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: execute,
  };
}

export default useFetch;