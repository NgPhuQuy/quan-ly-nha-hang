import apis, { endpoints } from "./apis";

export const layDanhSachChiNhanh = async () => {
  const res = await apis.get(endpoints.chi_nhanh);
  return res.data;
};
