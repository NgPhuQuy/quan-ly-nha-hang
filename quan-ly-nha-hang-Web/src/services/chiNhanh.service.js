import apis, { endpoints } from "./apis";

export const layDanhSachChiNhanh = async () => {
    const phanHoi = await apis.get(endpoints.chi_nhanh);
    return phanHoi.data;
};
