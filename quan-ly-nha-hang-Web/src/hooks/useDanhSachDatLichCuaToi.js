import { useState } from "react";
import { useFetch } from "./useFetch";
import {
  danhSachDatLichCuaToi,
  huyDatLich as apiHuyDatLich,
  capNhatTrangThaiDatLich,
} from "../services/datLich.service";
import { layThongBaoLoi } from "../utils/apiError";

export function useDanhSachDatLichCuaToi() {
  const {
    data: danhSach,
    setData: setDanhSach,
    loading: dangTai,
    error: loi,
    refetch: taiLai,
  } = useFetch(danhSachDatLichCuaToi, [], { initialData: [] });

  const [dangHuy, setDangHuy] = useState(false);

  const huyDatLich = async (maDatLich) => {
    if (!window.confirm("Quý khách có chắc chắn muốn hủy đặt bàn này không?"))
      return;
    setDangHuy(true);
    try {
      const capNhat = apiHuyDatLich
        ? await apiHuyDatLich(maDatLich)
        : await capNhatTrangThaiDatLich(maDatLich, "DA_HUY");

      setDanhSach((ds) =>
        (ds || []).map((dl) =>
          dl.maDatLich === maDatLich || dl.maDatLichId === maDatLich
            ? { ...dl, ...capNhat, trangThai: "DA_HUY" }
            : dl,
        ),
      );
      alert("Hủy đặt bàn thành công!");
    } catch (error) {
      console.error("Lỗi khi hủy đặt bàn:", error);
      alert(
        layThongBaoLoi(
          error,
          "Không thể hủy đặt bàn. Vui lòng liên hệ hotline nhà hàng!",
        ),
      );
    } finally {
      setDangHuy(false);
    }
  };

  return {
    danhSach: danhSach || [],
    dangTai,
    dangHuy,
    loi,
    huyDatLich,
    taiLai,
  };
}

export default useDanhSachDatLichCuaToi;