import { useState } from "react";
import { layDatLichTheoMa } from "../services/datLich.service";

export function useTraCuuDatLich() {
  const [bookingCode, setBookingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const searchBooking = async () => {
    if (!bookingCode.trim()) return;
    setLoading(true);
    setBooking(null);
    setNotFound(false);
    try {
      setBooking(await layDatLichTheoMa(bookingCode.trim()));
    } catch (error) {
      console.error("Could not find booking:", error);
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
    searchBooking,
  };
}
