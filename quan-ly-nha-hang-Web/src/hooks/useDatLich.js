import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";
import {
  layDanhSachDichVu,
  layDanhSachMonAn,
} from "../services/matHang.service";
import { taoDatLich } from "../services/datLich.service";
import apis, { endpoints } from "../services/apis";
import { useAuth } from "../contexts/AuthContext";
import { layThongBaoLoi } from "../utils/apiError";

export function useDatLich(initialValues = null) {
  const { user } = useAuth();

  const layNgayDiaPhuong = (d = new Date()) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const homNayStr = layNgayDiaPhuong();

  const savedBooking = (() => {
    if (initialValues && typeof initialValues === "object") {
      return initialValues;
    }
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
  const [maChiNhanh, setMaChiNhanh] = useState(
    savedBooking?.branchId || savedBooking?.maChiNhanh || "",
  );
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

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(false);
  const [dangGui, setDangGui] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    let isActive = true;
    setDangTaiDuLieu(true);

    const khoiTao = async () => {
      try {
        const dsChiNhanh = await layDanhSachChiNhanh();
        if (!isActive) return;

        const danhSach = Array.isArray(dsChiNhanh)
          ? dsChiNhanh
          : Array.isArray(dsChiNhanh?.data)
            ? dsChiNhanh.data
            : [];
        setBranches(danhSach);

        const selectedId =
          maChiNhanh ||
          savedBooking?.branchId ||
          savedBooking?.maChiNhanh ||
          danhSach[0]?.maChiNhanh ||
          "";

        if (!maChiNhanh && selectedId) {
          setMaChiNhanh(selectedId);
        }

        const numericBranchId =
          Number(String(selectedId).replace(/\D/g, "")) || 1;

        const [monAnRes, dichVuRes, khungGioRes] = await Promise.allSettled([
          layDanhSachMonAn(numericBranchId),
          layDanhSachDichVu(numericBranchId),
          date
            ? apis.get(endpoints.khung_gio(numericBranchId, date))
            : Promise.resolve({ data: [] }),
        ]);

        if (!isActive) return;
        if (monAnRes.status === "fulfilled") setMenuItems(monAnRes.value || []);
        if (dichVuRes.status === "fulfilled")
          setAdditionalServices(dichVuRes.value || []);
        if (khungGioRes.status === "fulfilled")
          setTimeSlots(khungGioRes.value?.data || []);
      } catch (err) {
        console.error("Lỗi tải dữ liệu khởi tạo:", err);
      } finally {
        if (isActive) setDangTaiDuLieu(false);
      }
    };

    khoiTao();
    return () => {
      isActive = false;
    };
  }, []);

  const isFirstBranchEffect = useRef(true);
  useEffect(() => {
    if (isFirstBranchEffect.current) {
      isFirstBranchEffect.current = false;
      return;
    }
    if (!maChiNhanh) return;

    let isActive = true;
    const numericBranchId =
      Number(String(maChiNhanh).replace(/\D/g, "")) || 1;

    Promise.allSettled([
      layDanhSachMonAn(numericBranchId),
      layDanhSachDichVu(numericBranchId),
      date
        ? apis.get(endpoints.khung_gio(numericBranchId, date))
        : Promise.resolve({ data: [] }),
    ]).then(([monAnRes, dichVuRes, khungGioRes]) => {
      if (!isActive) return;
      if (monAnRes.status === "fulfilled") setMenuItems(monAnRes.value || []);
      if (dichVuRes.status === "fulfilled")
        setAdditionalServices(dichVuRes.value || []);
      if (khungGioRes.status === "fulfilled")
        setTimeSlots(khungGioRes.value?.data || []);
    });

    return () => {
      isActive = false;
    };
  }, [maChiNhanh]);

  const isFirstDateEffect = useRef(true);
  useEffect(() => {
    if (isFirstDateEffect.current) {
      isFirstDateEffect.current = false;
      return;
    }
    if (!maChiNhanh || !date) return;

    let isActive = true;
    const numericBranchId =
      Number(String(maChiNhanh).replace(/\D/g, "")) || 1;

    apis
      .get(endpoints.khung_gio(numericBranchId, date))
      .then((res) => {
        if (isActive) setTimeSlots(res.data || []);
      })
      .catch(() => {
        if (isActive) setTimeSlots([]);
      });

    return () => {
      isActive = false;
    };
  }, [date]);

  const selectedBranch = useMemo(
    () =>
      branches.find(
        (b) =>
          String(b.maChiNhanh ?? b.id) === String(maChiNhanh),
      ),
    [branches, maChiNhanh],
  );

  const totalAmount = useMemo(() => {
    const tienMonAn = selectedItems.reduce((total, item) => {
      const mon = menuItems.find((m) => m.id === item.monAnId);
      return total + (mon?.gia || 0) * item.soLuong;
    }, 0);

    const tienDichVu = selectedServices.reduce((total, serviceId) => {
      const dv = additionalServices.find((s) => s.id === serviceId);
      return total + (dv?.gia || 0);
    }, 0);

    return tienMonAn + tienDichVu;
  }, [selectedItems, menuItems, selectedServices, additionalServices]);

  const handleDatLich = useCallback(async () => {
    setDangGui(true);
    setSubmitError("");

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
      maChiNhanh: Number(String(maChiNhanh).replace(/\D/g, "")) || 1,
      ngay: date,
      gio: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
      soKhach: Number(guestCount) || 2,
      hoTen: guestDetails.hoTen,
      soDienThoai: guestDetails.soDienThoai,
      email: guestDetails.email,
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
      return { thanhCong: true, data: result };
    } catch (error) {
      console.error("Lỗi đặt bàn:", error);
      const thongBao = layThongBaoLoi(
        error,
        "Đặt bàn chưa thành công. Vui lòng kiểm tra lại thông tin và thử lại!",
      );
      setSubmitError(thongBao);
      return { thanhCong: false, thongBao };
    } finally {
      setDangGui(false);
    }
  }, [
    maChiNhanh,
    date,
    selectedTime,
    guestCount,
    guestDetails,
    selectedItems,
    selectedServices,
  ]);

  const handleDatLai = () => {
    setStep(1);
    setMaChiNhanh(branches[0]?.maChiNhanh || "");
    setDate(homNayStr);
    setGuestCount(2);
    setSelectedTime("");
    setSelectedItems([]);
    setGuestDetails({
      hoTen: user?.hoTen || "",
      soDienThoai: user?.soDienThoai || "",
      email: user?.email || "",
      ghiChu: "",
      dip: "khong",
    });
    setSelectedServices([]);
    setBookingCode("");
    setSubmitError("");
  };

  return {
    step,
    setStep,
    maChiNhanh,
    setMaChiNhanh,
    branchId: maChiNhanh,
    setBranchId: setMaChiNhanh,
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
    dangTaiDuLieu,
    dangGui,
    isSubmitting: dangGui,
    submitError,
    setSubmitError,
    handleDatLich,
    handleDatLai,
    submitBooking: handleDatLich,
    resetBooking: handleDatLai,
  };
}
