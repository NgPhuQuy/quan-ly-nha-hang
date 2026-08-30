import { useEffect, useMemo, useState } from "react";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";
import {
  layDanhSachDichVuBoSung,
  layDanhSachMonAn,
  layKhungGio,
} from "../services/monAn.service";
import { taoDatLich } from "../services/datLich.service";

export function useDatLich() {
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
  const [branches, setBranches] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    layDanhSachChiNhanh()
      .then((data) => {
        if (data && data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!branchId) return;
    const numericBranchId = Number(String(branchId).replace(/\D/g, "")) || 1;
    layDanhSachMonAn(numericBranchId).then(setMenuItems);
    layDanhSachDichVuBoSung(numericBranchId).then(setAdditionalServices);
  }, [branchId]);

  useEffect(() => {
    if (!branchId || !date || !guestCount) return;
    const numericBranchId = Number(String(branchId).replace(/\D/g, "")) || 1;
    layKhungGio(numericBranchId, date, guestCount).then(setTimeSlots);
  }, [branchId, date, guestCount]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => String(branch.maChiNhanh ?? branch.id) === String(branchId)),
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
        (additionalServices.find((service) => service.id === serviceId)?.gia ||
          0),
      0,
    );

  const handleDatLich = async () => {
    const payload = {
      maChiNhanh: Number(String(branchId).replace(/\D/g, "")) || 1,
      ngay: date,
      gio: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
      soKhach: guestCount,
      ghiChu: guestDetails.ghiChu,
      hoTen: guestDetails.hoTen,
      soDienThoai: guestDetails.soDienThoai,
      email: guestDetails.email,
      dip: guestDetails.dip,
      dichVuBoSung: selectedServices,
      listDatTruoc: selectedItems.map((item) => ({
        maMatHang: Number(String(item.monAnId).replace(/\D/g, "")),
        soLuong: item.soLuong,
      })),
    };

    try {
      const result = await taoDatLich(payload);
      setBookingCode(
        result.maDatLichCode ||
          result.maDatLich ||
          result.maDatBan ||
          `5S-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      );
      setStep(5);
    } catch (error) {
      console.error("Lỗi đặt bàn:", error);
      window.alert("Đặt bàn chưa thành công. Vui lòng kiểm tra lại thông tin và thử lại!");
    }
  };

  const handleDatLai = () => {
    setStep(1);
    setBranchId("");
    setDate("");
    setGuestCount(2);
    setSelectedTime("");
    setSelectedItems([]);
    setGuestDetails({
      hoTen: "",
      soDienThoai: "",
      email: "",
      ghiChu: "",
      dip: "khong",
    });
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
    timeSlots,
    totalAmount,
    handleDatLich,
    handleDatLai,
    submitBooking: handleDatLich,
    resetBooking: handleDatLai,
  };
}
