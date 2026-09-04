import { useEffect, useMemo, useState } from "react";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";
import {
  layDanhSachDichVuBoSung,
  layDanhSachMonAn,
  layKhungGio,
} from "../services/monAn.service";
import { taoDatLich } from "../services/datLich.service";
import { useAuth } from "../contexts/AuthContext";

export function useDatLich() {
  const { user } = useAuth();

  const layNgayDiaPhuong = (d = new Date()) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const homNayStr = layNgayDiaPhuong();

  const savedBooking = (() => {
    try {
      const s =
        sessionStorage.getItem("ldelice_quick_booking") ||
        sessionStorage.getItem("5s_quick_booking");
      if (s) return JSON.parse(s);
    } catch {
      return null;
    }
    return null;
  })();

  const [step, setStep] = useState(1);
  const [branchId, setBranchId] = useState(savedBooking?.branchId || "");
  const [date, setDate] = useState(savedBooking?.date || homNayStr);
  const [guestCount, setGuestCount] = useState(
    savedBooking?.guestCount ? Number(savedBooking.guestCount) : 2,
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [guestDetails, setGuestDetails] = useState({
    hoTen: user?.hoTen || "",
    soDienThoai: user?.soDienThoai || "",
    email: user?.email || "",
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
    if (user) {
      setGuestDetails((prev) => ({
        ...prev,
        hoTen: prev.hoTen || user.hoTen || "",
        soDienThoai: prev.soDienThoai || user.soDienThoai || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    layDanhSachChiNhanh()
      .then((data) => {
        if (data && data.length) {
          setBranches(data);
          if (!branchId) {
            setBranchId(data[0].maChiNhanh);
          }
        }
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
    () =>
      branches.find(
        (branch) => String(branch.maChiNhanh ?? branch.id) === String(branchId),
      ),
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
    const preorderedItems = [
      ...(selectedItems || []).map((item) => ({
        maMatHang: Number(String(item.monAnId || item.id).replace(/\D/g, "")),
        soLuong: Number(item.soLuong) || 1,
      })),
      ...(selectedServices || []).map((serviceId) => ({
        maMatHang: Number(String(serviceId).replace(/\D/g, "")),
        soLuong: 1,
      })),
    ].filter((item) => item.maMatHang && item.soLuong > 0);

    const payload = {
      maChiNhanh: Number(String(branchId).replace(/\D/g, "")) || 1,
      ngay: date,
      gio: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
      soKhach: Number(guestCount) || 2,
      ghiChu: guestDetails.ghiChu ? guestDetails.ghiChu.trim() : "",
      dip: guestDetails.dip || "khong",
      listDatTruoc: preorderedItems.length > 0 ? preorderedItems : null,
    };

    try {
      const result = await taoDatLich(payload);
      setBookingCode(
        result.maDatLichCode ||
          (result.maDatLich ? `BK-${result.maDatLich}` : null) ||
          result.maDatBan ||
          `LDELICE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      );
      setStep(5);
    } catch (error) {
      console.error("Lỗi đặt bàn:", error);
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      window.alert(
        serverMessage ||
          "Đặt bàn chưa thành công. Vui lòng kiểm tra lại thông tin và thử lại!",
      );
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
