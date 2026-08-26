import apis, { endpoints } from "./apis";

export const fetchBranches = async () => {
  const res = await apis.get(endpoints.chi_nhanh);
  return res.data;
};
