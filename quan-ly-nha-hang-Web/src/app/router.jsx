import { lazy, Suspense, useEffect, useState } from "react";

const TrangChu = lazy(() => import("../pages/landing/TrangChu"));
const TrangDatBan = lazy(() => import("../pages/landing/TrangDatBan"));
const TrangTraCuu = lazy(() => import("../pages/landing/TrangTraCuu"));
const QuanLyApp = lazy(() => import("./QuanLyApp"));

const layDuongDan = () =>
  window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";

function DangTai() {
  return <div style={{ minHeight: "100vh" }} aria-busy="true" />;
}

function Router() {
  const [manHinh, setManHinh] = useState(layDuongDan);

  const dieuHuong = (manHinhMoi) => {
    window.history.pushState(
      {},
      "",
      manHinhMoi === "home" ? "/" : `/${manHinhMoi}`,
    );
    setManHinh(manHinhMoi);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const khiThayDoiLichSu = () => setManHinh(layDuongDan());
    window.addEventListener("popstate", khiThayDoiLichSu);
    return () => window.removeEventListener("popstate", khiThayDoiLichSu);
  }, []);

  const laQuanLy = manHinh.startsWith("admin") || manHinh.startsWith("pos");
  const khuVuc = manHinh.startsWith("admin") ? "admin" : "pos";
  const noiDung = laQuanLy ? (
    <QuanLyApp
      initialPage={manHinh.split("/")[1] || "dashboard"}
      initialRole={khuVuc === "admin" ? "admin" : "manager"}
      onNavigate={(trangMoi) => dieuHuong(`${khuVuc}/${trangMoi}`)}
    />
  ) : manHinh === "booking" ? (
    <TrangDatBan onBack={() => dieuHuong("home")} />
  ) : manHinh === "lookup" ? (
    <TrangTraCuu onBack={() => dieuHuong("home")} />
  ) : (
    <TrangChu
      onBookTable={() => dieuHuong("booking")}
      onLookupBooking={() => dieuHuong("lookup")}
    />
  );

  return <Suspense fallback={<DangTai />}>{noiDung}</Suspense>;
}

export default Router;
