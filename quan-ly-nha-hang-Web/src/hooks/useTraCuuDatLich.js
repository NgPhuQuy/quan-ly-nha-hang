import { useState } from "react";
import { layDatLichTheoMa } from "../services/datLich.service";

export function useTraCuuDatLich() {
  const [bookingCode, setBookingCode] = useState("");
  const [loading, setLoading] = useState(false);
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

  return {
    bookingCode,
    setBookingCode,
    loading,
    booking,
    notFound,
    handleTraCuu,
    searchBooking: handleTraCuu,
  };
}
