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
const BaoCao = lazy(() => import("../pages/quanLy/BaoCao"));
const ChiNhanh = lazy(() => import("../pages/quanLy/ChiNhanh"));
const TaiKhoan = lazy(() => import("../pages/quanLy/TaiKhoan"));
const KhachHang = lazy(() => import("../pages/quanLy/KhachHang"));
const DanhSachBan = lazy(() => import("../pages/quanLy/DanhSachBan"));
const DatLich = lazy(() => import("../pages/quanLy/DatLich"));
const CaiDat = lazy(() => import("../pages/quanLy/CaiDat"));

const pageTitles = {
  dashboard: "Tổng quan",
  bao_cao_tong_quan: "Tổng quan",
  invoices: "Hóa đơn",
  hoa_don: "Hóa đơn",
  "create-invoice": "Tạo hóa đơn",
  "invoice-detail": "Chi tiết hóa đơn",
  food: "Mặt hàng & Món ăn",
  "income-expense": "Thu chi",
  reports: "Báo cáo",
  tables: "Bàn",
  branches: "Chi nhánh",
  users: "Tài khoản",
  customers: "Khách hàng",
  bookings: "Đặt lịch",
  settings: "Cài đặt",
};

const pages = {
  dashboard: TongQuan,
  bao_cao_tong_quan: TongQuan,
  invoices: DanhSachHoaDon,
  hoa_don: DanhSachHoaDon,
  "create-invoice": TaoHoaDon,
  "invoice-detail": ChiTietHoaDon,
  food: ThucDon,
  reports: BaoCao,
  tables: DanhSachBan,
  branches: ChiNhanh,
  users: TaiKhoan,
  customers: KhachHang,
  bookings: DatLich,
  settings: CaiDat,
};

export default function QuanLyApp({
  initialPage = "dashboard",
  onNavigate,
  onQuayVeTrangChu,
}) {
  const { isAuth: daXacThuc, dangXuat: handleDangXuat } = useAuth();
  const [page, setPage] = useState(initialPage);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
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
    if (daXacThuc) {
      taiChiNhanh();
    }
  }, [daXacThuc, taiChiNhanh]);

  const Page = pages[page] || TongQuan;
  const noHeader = page === "create-invoice";

  const handleDangNhapThanhCong = () => {
    setPage("dashboard");
  };

  const khiChuyenTrang = (trangMoi) => {
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
    branches: chiNhanhs,
    loadingBranches: dangTaiChiNhanh,
    onRefreshBranches: taiChiNhanh,
    ...(page === "invoice-detail" ? { invoiceId: selectedInvoiceId } : {}),
    ...(page === "invoices" ? { onSelectInvoice: setSelectedInvoiceId } : {}),
  };

  return (
    <div
      className="flex h-screen overflow-hidden text-[#2a1a0d]"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Sidebar
        activePage={page}
        onNavigate={khiChuyenTrang}
        onDangXuat={handleDangXuat}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!noHeader && <Header title={pageTitles[page]} />}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Suspense fallback={<div className="min-h-full" aria-busy="true" />}>
            <Page {...pageProps} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
