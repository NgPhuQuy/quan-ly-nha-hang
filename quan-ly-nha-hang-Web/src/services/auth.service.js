import apis, { endpoints } from "./apis";

export const login = async (payload) =>
  (await apis.post(endpoints.login, payload)).data;
export const register = async (payload) =>
  (await apis.post(endpoints.register, payload)).data;
