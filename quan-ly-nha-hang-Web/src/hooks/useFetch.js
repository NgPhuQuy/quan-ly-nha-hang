import { useState, useEffect, useCallback } from "react";

/**
 * Hook dùng chung để gọi API + quản lý loading, error và refetch
 * Áp dụng Rule of Three: gom cấu trúc [data, loading, error, refetch] lặp lại ở nhiều nơi
 * 
 * @param {Function} fetchFn - Async function gọi API
 * @param {Array} deps - Danh sách dependency để gọi lại khi thay đổi (mặc định [])
 * @param {Object} options - Tùy chọn { initialData, autoFetch }
 */
export function useFetch(fetchFn, deps = [], options = {}) {
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
      const msg =
        err.response?.data?.message ||
        err.response?.data?.thongBao ||
        err.message ||
        "Đã xảy ra lỗi, vui lòng thử lại!";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoFetch) {
      execute().catch(() => {});
    }
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
