import { lazy, Suspense, useState } from "react";
import Sidebar from "../components/quanLy/Sidebar";
import Header from "../components/quanLy/Header";

const Dashboard = lazy(() => import("../pages/quanLy/Dashboard"));
const Invoices = lazy(() => import("../pages/quanLy/Invoices"));
const CreateInvoice = lazy(() => import("../pages/quanLy/CreateInvoice"));
const InvoiceDetail = lazy(() => import("../pages/quanLy/InvoiceDetail"));
const FoodMenu = lazy(() => import("../pages/quanLy/FoodMenu"));
const IncomeExpense = lazy(() => import("../pages/quanLy/IncomeExpense"));
const Reports = lazy(() => import("../pages/quanLy/Reports"));
const Branches = lazy(() => import("../pages/quanLy/Branches"));
const Users = lazy(() => import("../pages/quanLy/Users"));
const Customers = lazy(() => import("../pages/quanLy/Customers"));
const Categories = lazy(() => import("../pages/quanLy/Categories"));
const Tables = lazy(() => import("../pages/quanLy/Tables"));
const Bookings = lazy(() => import("../pages/quanLy/Bookings"));
const Promotions = lazy(() => import("../pages/quanLy/Promotions"));
const Settings = lazy(() => import("../pages/quanLy/Settings"));

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
  dashboard: Dashboard,
  invoices: Invoices,
  "create-invoice": CreateInvoice,
  "invoice-detail": InvoiceDetail,
  food: FoodMenu,
  "income-expense": IncomeExpense,
  reports: Reports,
  tables: Tables,
  branches: Branches,
  users: Users,
  customers: Customers,
  categories: Categories,
  bookings: Bookings,
  promotions: Promotions,
  settings: Settings,
};

export default function QuanLyApp({
  initialPage = "dashboard",
  initialRole = "manager",
  onNavigate,
}) {
  const [page, setPage] = useState(initialPage);
  const role = initialRole;
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const Page = pages[page] || Dashboard;
  const noHeader = page === "create-invoice";

  const khiChuyenTrang = (trangMoi) => {
    if (trangMoi === "branches" && role === "manager") return;
    if (trangMoi === "users" && role === "manager") return;
    if (trangMoi === "customers" && role === "manager") return;
    if (trangMoi === "categories" && role === "manager") return;
    if (trangMoi === "promotions" && role === "manager") return;
    setPage(trangMoi);
    onNavigate?.(trangMoi);
  };

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
      <Sidebar activePage={page} role={role} onNavigate={khiChuyenTrang} />
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
