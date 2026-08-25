import apis from "./apis";

export const apiDatLich = async (duLieu) => {
  const res = await apis.post("/dat-lich", duLieu);
  return res.data;
};
