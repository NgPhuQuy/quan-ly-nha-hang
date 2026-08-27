import { useState } from "react";
import Sidebar from "../../components/pos/Sidebar";
import Header from "../../components/pos/Header";
import TongQuan from "./TongQuan";
import HoaDon from "./HoaDon";
import TaoHoaDon from "./TaoHoaDon";
import ChiTietHoaDon from "./ChiTietHoaDon";
import ThucDon from "./ThucDon";
import ThuChi from "./ThuChi";
import BaoCao from "./BaoCao";
const pageTitles = {
  dashboard: "T\u1ED5ng quan",
  invoices: "H\xF3a \u0111\u01A1n",
  "create-invoice": "T\u1EA1o h\xF3a \u0111\u01A1n",
  "invoice-detail": "Chi ti\u1EBFt h\xF3a \u0111\u01A1n",
  food: "M\xF3n \u0103n",
  "income-expense": "Thu chi",
  reports: "B\xE1o c\xE1o",
};
export default function BanHang({ initialPage = "dashboard", onNavigate }) {
  const [page, setPage] = useState(initialPage);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    onNavigate?.(nextPage);
  };
  const showHeader = page !== "create-invoice";
  const Page =
    {
      dashboard: TongQuan,
      invoices: HoaDon,
      "create-invoice": TaoHoaDon,
      "invoice-detail": ChiTietHoaDon,
      food: ThucDon,
      "income-expense": ThuChi,
      reports: BaoCao,
    }[page] ?? TongQuan;

  const pageProps = {
    onNavigate: handleNavigate,
    ...(page === "invoice-detail" ? { invoiceId: selectedInvoiceId } : {}),
    ...(page === "invoices" ? { onSelectInvoice: setSelectedInvoiceId } : {}),
  };
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {showHeader && <Header title={pageTitles[page]} />}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <Page {...pageProps} />
        </main>
      </div>
    </div>
  );
}
