import apis, { endpoints } from "./apis";

export const dangNhap = async (duLieu) => (await apis.post(endpoints.login, duLieu)).data;
export const dangKy = async (duLieu) => (await apis.post(endpoints.register, duLieu)).data;
