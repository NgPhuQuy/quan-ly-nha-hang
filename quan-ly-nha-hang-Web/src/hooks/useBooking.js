import { useEffect, useMemo, useState } from "react";
import { CHI_NHANH_MAU } from "../data/chiNhanh";
import { DICH_VU_BO_SUNG, MON_AN } from "../data/datBan";
import { fetchBranches } from "../services/branch.service";
import { fetchAdditionalServices, fetchMenuItems } from "../services/menu.service";
import { createBooking } from "../services/booking.service";

export function useBooking() {
  const [step, setStep] = useState(1);
  const [branchId, setBranchId] = useState("");
  const [date, setDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [guestDetails, setGuestDetails] = useState({
    hoTen: "",
    soDienThoai: "",
    email: "",
    ghiChu: "",
    dip: "khong",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingCode, setBookingCode] = useState("");
  const [branches, setBranches] = useState(CHI_NHANH_MAU);
  const [menuItems, setMenuItems] = useState(MON_AN);
  const [additionalServices, setAdditionalServices] = useState(DICH_VU_BO_SUNG);

  useEffect(() => {
    fetchBranches()
      .then((data) => {
        if (data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!branchId) return;
    const numericBranchId = Number(String(branchId).replace(/\D/g, ""));
    fetchMenuItems(numericBranchId).then(setMenuItems);
    fetchAdditionalServices(numericBranchId).then(setAdditionalServices);
  }, [branchId]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => String(branch.id) === String(branchId)),
    [branches, branchId],
  );

  const totalAmount =
    selectedItems.reduce(
      (total, item) =>
        total +
        (menuItems.find((menuItem) => menuItem.id === item.monAnId)?.gia || 0) *
          item.soLuong,
      0,
    ) +
    selectedServices.reduce(
      (total, serviceId) =>
        total +
        (additionalServices.find((service) => service.id === serviceId)?.gia || 0),
      0,
    );

  const submitBooking = async () => {
    const payload = {
      maChiNhanh: Number(String(branchId).replace(/\D/g, "")),
      ngay: date,
      gio: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
      soKhach: guestCount,
      ghiChu: guestDetails.ghiChu,
      listDatTruoc: selectedItems.map((item) => ({
        maMatHang: Number(String(item.monAnId).replace(/\D/g, "")),
        soLuong: item.soLuong,
      })),
    };

    try {
      const result = await createBooking(payload);
      setBookingCode(
        result.maDatLich ||
          result.maDatBan ||
          `5S-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      );
      setStep(5);
    } catch (error) {
      console.error("Booking failed:", error);
      window.alert("Booking failed. Please try again.");
    }
  };

  const resetBooking = () => {
    setStep(1);
    setBranchId("");
    setDate("");
    setGuestCount(2);
    setSelectedTime("");
    setSelectedItems([]);
    setGuestDetails({ hoTen: "", soDienThoai: "", email: "", ghiChu: "", dip: "khong" });
    setSelectedServices([]);
    setBookingCode("");
  };

  return {
    step,
    setStep,
    branchId,
    setBranchId,
    date,
    setDate,
    guestCount,
    setGuestCount,
    selectedTime,
    setSelectedTime,
    selectedItems,
    setSelectedItems,
    guestDetails,
    setGuestDetails,
    selectedServices,
    setSelectedServices,
    bookingCode,
    branches,
    selectedBranch,
    menuItems,
    additionalServices,
    totalAmount,
    submitBooking,
    resetBooking,
  };
}
