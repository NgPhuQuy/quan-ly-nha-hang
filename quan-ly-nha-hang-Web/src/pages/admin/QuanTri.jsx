import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import TongQuan from "./TongQuan";
import ChiNhanh from "./ChiNhanh";
import TaiKhoan from "./TaiKhoan";
import KhachHang from "./KhachHang";
import MonAn from "./MonAn";
import DanhMuc from "./DanhMuc";
import Ban from "./Ban";
import HoaDon from "./HoaDon";
import DatLich from "./DatLich";
import KhuyenMai from "./KhuyenMai";
import ThuChi from "./ThuChi";
import BaoCao from "./BaoCao";
import CaiDat from "./CaiDat";
const pages = {
  dashboard: <TongQuan />,
  branches: <ChiNhanh />,
  users: <TaiKhoan />,
  customers: <KhachHang />,
  foods: <MonAn />,
  categories: <DanhMuc />,
  tables: <Ban />,
  invoices: <HoaDon />,
  bookings: <DatLich />,
  promotions: <KhuyenMai />,
  finance: <ThuChi />,
  reports: <BaoCao />,
  settings: <CaiDat />,
};
export default function QuanTri({ initialPage = "dashboard", onNavigate }) {
  const [activePage, setActivePage] = useState(initialPage);
  const khiChuyenTrang = (page) => {
    setActivePage(page);
    onNavigate?.(page);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#fafaf8",
      }}
    >
      <Sidebar active={activePage} onNavigate={khiChuyenTrang} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {pages[activePage] ?? <TongQuan />}
      </main>
    </div>
  );
}
