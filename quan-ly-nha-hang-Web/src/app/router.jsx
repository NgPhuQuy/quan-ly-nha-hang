import { lazy, Suspense, useEffect, useState } from "react";

const TrangChu = lazy(() => import("../pages/landing/TrangChu"));
const TrangDatBan = lazy(() => import("../pages/landing/TrangDatBan"));
const TrangTraCuu = lazy(() => import("../pages/landing/TrangTraCuu"));
const TrangXacThuc = lazy(() => import("../pages/landing/TrangXacThuc"));
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

  const laXacThuc =
    manHinh === "auth" ||
    manHinh === "login" ||
    manHinh === "register" ||
    manHinh === "dang-nhap" ||
    manHinh === "dang-ky";

  const laQuanLy = manHinh.startsWith("admin") || manHinh.startsWith("pos");

  const khuVuc = manHinh.startsWith("admin") ? "admin" : "pos";

  const noiDung = laXacThuc ? (
    <TrangXacThuc
      defaultTab={
        manHinh === "register" || manHinh === "dang-ky" ? "register" : "login"
      }
      onDangNhapThanhCong={(user) => {
        if (
          user?.vaiTro === "ADMIN" ||
          user?.vaiTro === "QUANLY" ||
          user?.vaiTro === "NHANVIEN"
        ) {
          dieuHuong("admin");
        } else {
          dieuHuong("home");
        }
      }}
      onQuayVeTrangChu={() => dieuHuong("home")}
    />
  ) : laQuanLy ? (
    <QuanLyApp
      initialPage={manHinh.split("/")[1] || "dashboard"}
      initialRole={khuVuc === "admin" ? "admin" : "manager"}
      onNavigate={(trangMoi) => dieuHuong(`${khuVuc}/${trangMoi}`)}
      onQuayVeTrangChu={() => dieuHuong("home")}
    />
  ) : manHinh === "booking" ? (
    <TrangDatBan onQuayLai={() => dieuHuong("home")} />
  ) : manHinh === "lookup" ? (
    <TrangTraCuu onQuayLai={() => dieuHuong("home")} />
  ) : (
    <TrangChu
      onDatBan={() => dieuHuong("booking")}
      onTraCuuDatBan={() => dieuHuong("lookup")}
      onDangNhap={() => dieuHuong("login")}
      onDangKy={() => dieuHuong("register")}
    />
  );

  return <Suspense fallback={<DangTai />}>{noiDung}</Suspense>;
}

export default Router;
