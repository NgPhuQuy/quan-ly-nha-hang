import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../pages/pos/Dashboard";
import Invoices from "../../pages/pos/Invoices";
import CreateInvoice from "../../pages/pos/CreateInvoice";
import InvoiceDetail from "../../pages/pos/InvoiceDetail";
import FoodMenu from "../../pages/pos/FoodMenu";
import IncomeExpense from "../../pages/pos/IncomeExpense";
import Reports from "../../pages/pos/Reports";
const pageTitles = {
  dashboard: "T\u1ED5ng quan",
  invoices: "H\xF3a \u0111\u01A1n",
  "create-invoice": "T\u1EA1o h\xF3a \u0111\u01A1n",
  "invoice-detail": "Chi ti\u1EBFt h\xF3a \u0111\u01A1n",
  food: "M\xF3n \u0103n",
  "income-expense": "Thu chi",
  reports: "B\xE1o c\xE1o"
};
export default function App({ initialPage = "dashboard", onNavigate }) {
  const [page, setPage] = useState(initialPage);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    onNavigate?.(nextPage);
  };
  const showHeader = page !== "create-invoice";
  return <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {showHeader && <Header title={pageTitles[page]} />}
        <main className="flex-1 min-h-0 overflow-y-auto">
          {page === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
          {page === "invoices" && <Invoices
    onNavigate={handleNavigate}
    onSelectInvoice={(id) => {
      setSelectedInvoiceId(id);
    }}
  />}
          {page === "create-invoice" && <CreateInvoice onNavigate={handleNavigate} />}
          {page === "invoice-detail" && <InvoiceDetail invoiceId={selectedInvoiceId} onNavigate={handleNavigate} />}
          {page === "food" && <FoodMenu />}
          {page === "income-expense" && <IncomeExpense />}
          {page === "reports" && <Reports />}
        </main>
      </div>
    </div>;
}
