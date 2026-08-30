import apis, { endpoints } from "./apis";

export const layDashboardOverview = async (maChiNhanh) => {
  try {
    const params = maChiNhanh ? { maChiNhanh } : {};
    const res = await apis.get(endpoints.dashboard_overview, { params });
    return res.data;
  } catch (error) {
    console.warn("Could not fetch dashboard overview from API:", error);
    return null;
  }
};

export const layDoanhThuTheoNgay = async (maChiNhanh) => {
  try {
    const params = maChiNhanh ? { maChiNhanh } : {};
    const res = await apis.get(endpoints.dashboard_revenue_by_day, { params });
    return res.data || [];
  } catch (error) {
    console.warn("Could not fetch revenue by day from API:", error);
    return [];
  }
};

export const layDoanhThuTheoChiNhanh = async () => {
  try {
    const res = await apis.get(endpoints.dashboard_revenue_by_branch);
    return res.data || [];
  } catch (error) {
    console.warn("Could not fetch revenue by branch from API:", error);
    return [];
  }
};

export const layDoanhThuTheoNguon = async (maChiNhanh) => {
  try {
    const params = maChiNhanh ? { maChiNhanh } : {};
    const res = await apis.get(endpoints.dashboard_revenue_by_source, {
      params,
    });
    return res.data || [];
  } catch (error) {
    console.warn("Could not fetch revenue by source from API:", error);
    return [];
  }
};
