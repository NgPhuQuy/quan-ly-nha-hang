import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "./Dashboard";
import Branches from "./Branches";
import Users from "./Users";
import Customers from "./Customers";
import Foods from "./Foods";
import Categories from "./Categories";
import Tables from "./Tables";
import Invoices from "./Invoices";
import Bookings from "./Bookings";
import Promotions from "./Promotions";
import Finance from "./Finance";
import Reports from "./Reports";
import Settings from "./Settings";
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
  settings: <Settings />,
};
export default function App({ initialPage = "dashboard", onNavigate }) {
  const [activePage, setActivePage] = useState(initialPage);
  const handleNavigate = (page) => {
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
      <Sidebar active={activePage} onNavigate={handleNavigate} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {pages[activePage] ?? <Dashboard />}
      </main>
    </div>
  );
}
