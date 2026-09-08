import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import Sidebar from "../components/quanLy/Sidebar";
import Header from "../components/quanLy/Header";
import DangNhap from "../pages/quanLy/DangNhap";
import { useAuth } from "../contexts/AuthContext";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";

const TongQuan = lazy(() => import("../pages/quanLy/TongQuan"));
const DanhSachHoaDon = lazy(() => import("../pages/quanLy/DanhSachHoaDon"));
const TaoHoaDon = lazy(() => import("../pages/quanLy/TaoHoaDon"));
const ChiTietHoaDon = lazy(() => import("../pages/quanLy/ChiTietHoaDon"));
const ThucDon = lazy(() => import("../pages/quanLy/ThucDon"));
const ChiNhanh = lazy(() => import("../pages/quanLy/ChiNhanh"));
const TaiKhoan = lazy(() => import("../pages/quanLy/TaiKhoan"));
const KhachHang = lazy(() => import("../pages/quanLy/KhachHang"));
const DanhSachBan = lazy(() => import("../pages/quanLy/DanhSachBan"));
const DatLich = lazy(() => import("../pages/quanLy/DatLich"));
const CaiDat = lazy(() => import("../pages/quanLy/CaiDat"));

const pageTitles = {
  tong_quan: "Tổng quan",
  chi_nhanh: "Chi nhánh",
  tai_khoan: "Tài khoản",
  khach_hang: "Khách hàng",
  mon_an: "Món ăn",
  ban: "Bàn",
  hoa_don: "Hóa đơn",
  tao_hoa_don: "Tạo hóa đơn",
  chi_tiet_hoa_don: "Chi tiết hóa đơn",
  dat_lich: "Đặt lịch",
  cai_dat: "Cài đặt",
};

const pages = {
  tong_quan: TongQuan,
  chi_nhanh: ChiNhanh,
  tai_khoan: TaiKhoan,
  khach_hang: KhachHang,
  mon_an: ThucDon,
  ban: DanhSachBan,
  hoa_don: DanhSachHoaDon,
  tao_hoa_don: TaoHoaDon,
  chi_tiet_hoa_don: ChiTietHoaDon,
  dat_lich: DatLich,
  cai_dat: CaiDat,
};

export default function QuanLyApp({
  initialPage = "tong_quan",
  khuVuc = "admin",
  onNavigate,
  onQuayVeTrangChu,
}) {
  const { isAuth: daXacThuc, dangXuat: handleDangXuat } = useAuth();
  const isPos =
    khuVuc === "pos" ||
    (typeof window !== "undefined" &&
      window.location.pathname.startsWith("/pos"));

  const [page, setPage] = useState(initialPage);
  const [selectedMaHoaDon, setSelectedMaHoaDon] = useState("");
  const [chiNhanhs, setChiNhanhs] = useState([]);
  const [dangTaiChiNhanh, setDangTaiChiNhanh] = useState(false);

  const taiChiNhanh = useCallback(async () => {
    setDangTaiChiNhanh(true);
    try {
      const data = await layDanhSachChiNhanh();
      setChiNhanhs(Array.isArray(data) ? data : []);
    } catch {
      setChiNhanhs([]);
    } finally {
      setDangTaiChiNhanh(false);
    }
  }, []);

  useEffect(() => {
    if (!daXacThuc) return undefined;

    const timeoutId = setTimeout(() => {
      taiChiNhanh();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [daXacThuc, taiChiNhanh]);

  const trangBiCam =
    isPos && ["chi_nhanh", "tai_khoan", "khach_hang"].includes(page);
  const trangHienThi = trangBiCam ? "tong_quan" : page;
  const Page = pages[trangHienThi] || TongQuan;
  const noHeader = trangHienThi === "tao_hoa_don";

  const handleDangNhapThanhCong = () => {
    setPage("tong_quan");
  };

  const khiChuyenTrang = (trangMoi) => {
    if (isPos && ["chi_nhanh", "tai_khoan", "khach_hang"].includes(trangMoi)) {
      return;
    }
    setPage(trangMoi);
    onNavigate?.(trangMoi);
  };

  if (!daXacThuc) {
    return (
      <DangNhap
        onDangNhapThanhCong={handleDangNhapThanhCong}
        onQuayVeTrangChu={onQuayVeTrangChu}
      />
    );
  }

  const pageProps = {
    onNavigate: khiChuyenTrang,
    isPos,
    khuVuc,
    chi_nhanh: chiNhanhs,
    loadingBranches: dangTaiChiNhanh,
    onRefreshBranches: taiChiNhanh,
    ...(trangHienThi === "chi_tiet_hoa_don" ? { invoiceId: selectedMaHoaDon } : {}),
    ...(trangHienThi === "hoa_don" ? { onSelectInvoice: setSelectedMaHoaDon } : {}),
  };

  return (
    <div
      className="flex h-screen overflow-hidden text-[#2a1a0d]"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Sidebar
        activePage={trangHienThi}
        isPos={isPos}
        khuVuc={khuVuc}
        onNavigate={khiChuyenTrang}
        onDangXuat={handleDangXuat}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!noHeader && <Header title={pageTitles[trangHienThi] || "Tổng quan"} />}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Suspense fallback={<div className="min-h-full" aria-busy="true" />}>
            <Page {...pageProps} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
