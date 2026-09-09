import { lazy, Suspense, useState, useEffect, useCallback, Component } from "react";
import Sidebar from "../components/quanLy/Sidebar";
import Header from "../components/quanLy/Header";
import DangNhap from "../pages/quanLy/DangNhap";
import { useAuth } from "../contexts/AuthContext";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <div className="inline-block p-5 rounded-xl bg-red-50 text-red-700 text-sm max-w-lg mb-4 border border-red-200">
            <p className="font-bold mb-1">Đã xảy ra lỗi khi tải trang!</p>
            <p className="text-xs text-red-600 mb-3">{this.state.error?.message || "Lỗi không xác định"}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 cursor-pointer"
            >
              Thử tải lại trang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


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
  const [selectedMaHoaDon, setSelectedMaHoaDon] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const qId = urlParams.get("id");
      if (qId) return Number(qId);
      const saved = localStorage.getItem("selected_ma_hoa_don");
      return saved ? Number(saved) : "";
    } catch {
      return "";
    }
  });

  const handleSelectInvoice = useCallback((id) => {
    setSelectedMaHoaDon(id);
    try {
      if (id) {
        localStorage.setItem("selected_ma_hoa_don", String(id));
      } else {
        localStorage.removeItem("selected_ma_hoa_don");
      }
    } catch {
      // ignore
    }
  }, []);

  const [chiNhanhs, setChiNhanhs] = useState([]);
  const [dangTaiChiNhanh, setDangTaiChiNhanh] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(() => {
    try {
      const saved = localStorage.getItem("selected_branch_id");
      return saved ? Number(saved) : "";
    } catch {
      return "";
    }
  });

  const handleSelectBranch = useCallback((branchId) => {
    const idNum = Number(branchId);
    setSelectedBranchId(idNum);
    try {
      localStorage.setItem("selected_branch_id", String(idNum));
    } catch {
      // ignore
    }
  }, []);

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
    taiChiNhanh();
  }, [taiChiNhanh]);

  const activeBranchId =
    chiNhanhs.find((b) => b.maChiNhanh === selectedBranchId)?.maChiNhanh ||
    chiNhanhs[0]?.maChiNhanh ||
    "";

  const trangBiCam =
    isPos && ["chi_nhanh", "tai_khoan", "khach_hang"].includes(page);
  const trangHienThi = trangBiCam ? "tong_quan" : page;
  const Page = pages[trangHienThi] || TongQuan;
  const noHeader =
    trangHienThi === "tao_hoa_don" || trangHienThi === "chi_tiet_hoa_don";




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
    selectedBranchId: activeBranchId,
    onSelectBranch: handleSelectBranch,
    ...(trangHienThi === "chi_tiet_hoa_don" ? { invoiceId: selectedMaHoaDon } : {}),
    ...(trangHienThi === "hoa_don" ? { onSelectInvoice: handleSelectInvoice } : {}),
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
        {!noHeader && (
          <Header
            title={pageTitles[trangHienThi] || "Tổng quan"}
            selectedBranchId={activeBranchId}
            onSelectBranch={handleSelectBranch}
            chi_nhanh={chiNhanhs}
            loadingBranches={dangTaiChiNhanh}
          />
        )}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <ErrorBoundary key={trangHienThi}>
            <Suspense fallback={<div className="min-h-full" aria-busy="true" />}>
              <Page {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
