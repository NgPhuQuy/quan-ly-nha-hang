import { lazy, Suspense, useState } from "react";
import Sidebar from "../components/quanLy/Sidebar";
import Header from "../components/quanLy/Header";
import DangNhap from "../pages/quanLy/DangNhap";
import TrangKhongCoQuyen from "../pages/landing/TrangKhongCoQuyen";
import { useAuth } from "../contexts/AuthContext";

const TongQuan = lazy(() => import("../pages/quanLy/TongQuan"));
const DanhSachHoaDon = lazy(() => import("../pages/quanLy/DanhSachHoaDon"));
const TaoHoaDon = lazy(() => import("../pages/quanLy/TaoHoaDon"));
const ChiTietHoaDon = lazy(() => import("../pages/quanLy/ChiTietHoaDon"));
const ThucDon = lazy(() => import("../pages/quanLy/ThucDon"));
const ThuChi = lazy(() => import("../pages/quanLy/ThuChi"));
const BaoCao = lazy(() => import("../pages/quanLy/BaoCao"));
const ChiNhanh = lazy(() => import("../pages/quanLy/ChiNhanh"));
const TaiKhoan = lazy(() => import("../pages/quanLy/TaiKhoan"));
const KhachHang = lazy(() => import("../pages/quanLy/KhachHang"));
const DanhMucMon = lazy(() => import("../pages/quanLy/DanhMucMon"));
const DanhSachBan = lazy(() => import("../pages/quanLy/DanhSachBan"));
const DatLich = lazy(() => import("../pages/quanLy/DatLich"));
const KhuyenMai = lazy(() => import("../pages/quanLy/KhuyenMai"));
const CaiDat = lazy(() => import("../pages/quanLy/CaiDat"));

const pageTitles = {
  dashboard: "Tổng quan",
  invoices: "Hóa đơn",
  "create-invoice": "Tạo hóa đơn",
  "invoice-detail": "Chi tiết hóa đơn",
  food: "Món ăn",
  "income-expense": "Thu chi",
  reports: "Báo cáo",
  tables: "Bàn",
  branches: "Chi nhánh",
  users: "Tài khoản",
  customers: "Khách hàng",
  categories: "Danh mục món",
  bookings: "Đặt lịch",
  promotions: "Khuyến mãi",
  settings: "Cài đặt",
};

const pages = {
  dashboard: TongQuan,
  invoices: DanhSachHoaDon,
  "create-invoice": TaoHoaDon,
  "invoice-detail": ChiTietHoaDon,
  food: ThucDon,
  "income-expense": ThuChi,
  reports: BaoCao,
  tables: DanhSachBan,
  branches: ChiNhanh,
  users: TaiKhoan,
  customers: KhachHang,
  categories: DanhMucMon,
  bookings: DatLich,
  promotions: KhuyenMai,
  settings: CaiDat,
};

export default function QuanLyApp({
  initialPage = "dashboard",
  onNavigate,
  onQuayVeTrangChu,
}) {
  const {
    isAuth: daXacThuc,
    isNhanVien,
    isAdmin,
    dangXuat: handleDangXuat,
  } = useAuth();
  const [page, setPage] = useState(initialPage);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");

  const role = isAdmin ? "admin" : "manager";
  const Page = pages[page] || TongQuan;
  const noHeader = page === "create-invoice";

  const handleDangNhapThanhCong = () => {
    setPage("dashboard");
  };

  const khiChuyenTrang = (trangMoi) => {
    if (trangMoi === "branches" && role === "manager") return;
    if (trangMoi === "users" && role === "manager") return;
    if (trangMoi === "customers" && role === "manager") return;
    if (trangMoi === "categories" && role === "manager") return;
    if (trangMoi === "promotions" && role === "manager") return;
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

  if (!isNhanVien) {
    return (
      <TrangKhongCoQuyen
        onQuayVeTrangChu={onQuayVeTrangChu}
        onDangNhapKhac={() => onNavigate?.("login")}
      />
    );
  }

  const pageProps = {
    onNavigate: khiChuyenTrang,
    ...(page === "invoice-detail" ? { invoiceId: selectedInvoiceId } : {}),
    ...(page === "invoices" ? { onSelectInvoice: setSelectedInvoiceId } : {}),
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <Sidebar
        activePage={page}
        role={role}
        onNavigate={khiChuyenTrang}
        onDangXuat={handleDangXuat}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!noHeader && <Header title={pageTitles[page]} role={role} />}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Suspense fallback={<div className="min-h-full" aria-busy="true" />}>
            <Page role={role} {...pageProps} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
