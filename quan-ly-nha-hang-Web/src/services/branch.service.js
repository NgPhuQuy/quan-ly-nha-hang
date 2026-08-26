import apis, { endpoints } from "./apis";

export const normalizeBranch = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((branch, index) => ({
    id: branch.maChiNhanh ?? branch.id ?? index + 1,
    ten: branch.tenChiNhanh ?? branch.ten ?? `Branch ${index + 1}`,
    diaChi: branch.diaChi ?? "Address unavailable",
    soDienThoai: branch.soDienThoai ?? "Phone unavailable",
    soCho: branch.soCho ?? branch.sucChua ?? 0,
    anh: branch.anh ?? "",
  }));
};

export const fetchBranches = async () => {
  const response = await apis.get(endpoints.chi_nhanh);
  return normalizeBranch(response.data);
};
