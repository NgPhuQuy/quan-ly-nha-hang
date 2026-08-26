import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import Branches from "../../pages/admin/Branches";
import Users from "../../pages/admin/Users";
import Customers from "../../pages/admin/Customers";
import Foods from "../../pages/admin/Foods";
import Categories from "../../pages/admin/Categories";
import Tables from "../../pages/admin/Tables";
import Invoices from "../../pages/admin/Invoices";
import Bookings from "../../pages/admin/Bookings";
import Promotions from "../../pages/admin/Promotions";
import Finance from "../../pages/admin/Finance";
import Reports from "../../pages/admin/Reports";
import Settings from "../../pages/admin/Settings";
const pages = {
  dashboard: <Dashboard />,
  branches: <Branches />,
  users: <Users />,
  customers: <Customers />,
  foods: <Foods />,
  categories: <Categories />,
  tables: <Tables />,
  invoices: <Invoices />,
  bookings: <Bookings />,
  promotions: <Promotions />,
  finance: <Finance />,
  reports: <Reports />,
  settings: <Settings />
};
export default function App({ initialPage = "dashboard", onNavigate }) {
  const [activePage, setActivePage] = useState(initialPage);
  const handleNavigate = (page) => {
    setActivePage(page);
    onNavigate?.(page);
  };
  return <div
    style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "#fafaf8"
    }}
  >
      <Sidebar active={activePage} onNavigate={handleNavigate} />
      <main
    style={{
      flex: 1,
      overflowY: "auto",
      minWidth: 0
    }}
  >
        {pages[activePage] ?? <Dashboard />}
      </main>
    </div>;
}
