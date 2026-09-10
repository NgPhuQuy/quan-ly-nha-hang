import { useEffect, useMemo, useState, useCallback } from "react";
import { layDanhSachChiNhanhPublic } from "../services/chiNhanh.service";
import {
  layDanhSachMatHangTaiChiNhanh,
  layDanhSachDichVu,
  layDanhSachMonAn,
  layDanhSachThucUong,
} from "../services/matHang.service";
import { taoDatLich } from "../services/datLich.service";
import apis, { endpoints } from "../services/apis";
import { useAuth } from "../contexts/AuthContext";
import { layThongBaoLoi } from "../utils/apiError";

const chuyenPhut = (gio) => {
  const [gioPhan, phutPhan] = String(gio || "08:00")
    .split(":")
    .map(Number);
  return (gioPhan || 0) * 60 + (phutPhan || 0);
};

const dinhDangGio = (tongPhut) =>
  `${String(Math.floor(tongPhut / 60)).padStart(2, "0")}:${String(
    tongPhut % 60,
  ).padStart(2, "0")}:00`;

const SO_LUONG_DON_MAC_DINH = 30;

const taoDanhSachKhungGio = (chiNhanh, khungGioDaDat) => {
  const gioMo = chuyenPhut(chiNhanh?.gioHoatDong || "08:00");
  const gioDong = chuyenPhut(chiNhanh?.gioDongCua || "21:00");
  const soLuongMacDinh = SO_LUONG_DON_MAC_DINH;
  const daDatTheoGio = new Map(
    khungGioDaDat.map((slot) => [
      String(slot.gio).slice(0, 5),
      Number(slot.soLuongConLai),
    ]),
  );
  const danhSach = [];

  for (let gio = gioMo; gio <= gioDong; gio += 30) {
    const gioHienThi = dinhDangGio(gio);
    const soLuongConLai = daDatTheoGio.has(gioHienThi.slice(0, 5))
      ? daDatTheoGio.get(gioHienThi.slice(0, 5))
      : soLuongMacDinh;

    danhSach.push({ gio: gioHienThi, soLuongConLai });
  }

  return danhSach;
};

export function useDatLich(initialValues = null) {
  const { nguoiDung } = useAuth();
  const hoTenNguoiDung = [nguoiDung?.ho, nguoiDung?.ten]
    .filter(Boolean)
    .join(" ");

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
    hoTen: hoTenNguoiDung,
    soDienThoai: nguoiDung?.soDienThoai || "",
    email: nguoiDung?.email || "",
    ghiChu: "",
    dip: "khong",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingCode, setBookingCode] = useState("");

  const [chi_nhanh, setChiNhanh] = useState([]);
  const [danhSachMonAn, setDanhSachMonAn] = useState([]);
  const [nhomMenu, setNhomMenu] = useState("ALL");
  const [dichVuBoSung, setDichVuBoSung] = useState([]);
  const [khungGio, setKhungGio] = useState([]);

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(false);
  const [dangGui, setDangGui] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const taiMenuTheoNhom = useCallback(async (maChiNhanh, nhom) => {
    const taiTheoNhom = {
      ALL: layDanhSachMatHangTaiChiNhanh,
      MON_AN: layDanhSachMonAn,
      THUC_UONG: layDanhSachThucUong,
      DICH_VU: layDanhSachDichVu,
    };
    const duLieu = await taiTheoNhom[nhom](maChiNhanh);
    return duLieu;
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (nguoiDung) {
        setGuestDetails((prev) => ({
          ...prev,
          hoTen: prev.hoTen || hoTenNguoiDung,
          soDienThoai: prev.soDienThoai || nguoiDung.soDienThoai || "",
          email: prev.email || nguoiDung.email || "",
        }));
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [nguoiDung, hoTenNguoiDung]);

  useEffect(() => {
    let isActive = true;

    const taiChiNhanh = async () => {
      try {
        const danhSach = await layDanhSachChiNhanhPublic();
        if (!isActive) return;

        setChiNhanh(danhSach);
        if (!maChiNhanh && danhSach[0]?.maChiNhanh) {
          setMaChiNhanh(danhSach[0].maChiNhanh);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách chi nhánh:", err);
      }
    };

    const timeoutId = setTimeout(() => {
      taiChiNhanh();
    }, 0);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [maChiNhanh]);

  useEffect(() => {
    if (!maChiNhanh) return undefined;

    let isActive = true;
    const loadingTimeoutId = setTimeout(() => {
      setDangTaiDuLieu(true);
    }, 0);
    const numericBranchId = Number(maChiNhanh);

    Promise.allSettled([
      taiMenuTheoNhom(numericBranchId, nhomMenu),
      layDanhSachDichVu(numericBranchId),
      date
        ? apis.get(endpoints.khung_gio(numericBranchId, date))
        : Promise.resolve({ data: [] }),
    ]).then(([menuRes, dichVuRes, khungGioRes]) => {
      if (!isActive) return;
      if (menuRes.status === "fulfilled") setDanhSachMonAn(menuRes.value);
      if (dichVuRes.status === "fulfilled")
        setDichVuBoSung(dichVuRes.value);
      if (khungGioRes.status === "fulfilled")
        setKhungGio(khungGioRes.value.data);
      setDangTaiDuLieu(false);
    });

    return () => {
      isActive = false;
      clearTimeout(loadingTimeoutId);
    };
  }, [maChiNhanh, date, nhomMenu, taiMenuTheoNhom]);

  const chiNhanhDaChon = useMemo(
    () => chi_nhanh.find((b) => String(b.maChiNhanh) === String(maChiNhanh)),
    [chi_nhanh, maChiNhanh],
  );

  const khungGioHienThi = useMemo(
    () => taoDanhSachKhungGio(chiNhanhDaChon, khungGio),
    [chiNhanhDaChon, khungGio],
  );

  const totalAmount = useMemo(() => {
    const tienMonAn = selectedItems.reduce((total, item) => {
      const mon = danhSachMonAn.find(
        (m) => m.maMatHang === item.maMatHang,
      );
      const donGia = mon?.giaMatHang ?? item.giaMatHang ?? item.gia ?? 0;
      return total + Number(donGia) * item.soLuong;
    }, 0);

    const tienDichVu = selectedServices.reduce((total, serviceId) => {
      const dv = dichVuBoSung.find(
        (s) => s.maMatHang === serviceId,
      );
      const donGia = dv?.giaMatHang ?? dv?.gia ?? 0;
      return total + Number(donGia);
    }, 0);

    return tienMonAn + tienDichVu;
  }, [selectedItems, danhSachMonAn, selectedServices, dichVuBoSung]);

  const handleDatLich = useCallback(async () => {
    setDangGui(true);
    setSubmitError("");

    const preorderedItems = [
      ...selectedItems.map((item) => ({
        maMatHang: Number(item.maMatHang),
        soLuong: Number(item.soLuong),
      })),
      ...selectedServices.map((serviceId) => ({
        maMatHang: Number(serviceId),
        soLuong: 1,
      })),
    ].filter((item) => item.maMatHang && item.soLuong > 0);

    const payload = {
      maChiNhanh: Number(maChiNhanh),
      ngay: date,
      gio: selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime,
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
        result.maDatLich
          ? `BK-${result.maDatLich}`
          : `LDELICE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
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
    guestDetails,
    selectedItems,
    selectedServices,
  ]);

  const handleDatLai = () => {
    setStep(1);
    setMaChiNhanh(chi_nhanh[0]?.maChiNhanh || "");
    setDate(homNayStr);
    setGuestCount(2);
    setSelectedTime("");
    setSelectedItems([]);
    setGuestDetails({
      hoTen: hoTenNguoiDung,
      soDienThoai: nguoiDung?.soDienThoai || "",
      email: nguoiDung?.email || "",
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
    chi_nhanh,
    chiNhanhDaChon,
    danhSachMonAn,
    dichVuBoSung,
    nhomMenu,
    setNhomMenu,
    khungGio: khungGioHienThi,
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
