import { useState } from "react";
import {
  layDatLichTheoMa,
  capNhatTrangThaiDatLich,
} from "../services/datLich.service";

export function useTraCuuDatLich() {
  const [bookingCode, setBookingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleTraCuu = async () => {
    if (!bookingCode.trim()) return;
    setLoading(true);
    setBooking(null);
    setNotFound(false);
    try {
      setBooking(await layDatLichTheoMa(bookingCode.trim()));
    } catch (error) {
      console.error("Không tìm thấy thông tin đặt chỗ:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleHuyDatLich = async () => {
    if (!booking?.maDatLichId) return;
    if (!window.confirm("Quý khách có chắc chắn muốn hủy đặt bàn này không?"))
      return;
    setCancelling(true);
    try {
      const updated = await capNhatTrangThaiDatLich(
        booking.maDatLichId,
        "DA_HUY",
      );
      setBooking(updated);
      alert("Hủy đặt bàn thành công!");
    } catch (error) {
      console.error("Lỗi khi hủy đặt bàn:", error);
      alert("Không thể hủy đặt bàn. Vui lòng liên hệ hotline nhà hàng!");
    } finally {
      setCancelling(false);
    }
  };

  return {
    bookingCode,
    setBookingCode,
    loading,
    cancelling,
    booking,
    notFound,
    handleTraCuu,
    handleHuyDatLich,
    searchBooking: handleTraCuu,
  };
}
