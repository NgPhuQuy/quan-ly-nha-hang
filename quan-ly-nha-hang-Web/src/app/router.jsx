import { lazy, Suspense, useEffect, useState } from "react";

const TrangChu = lazy(() => import("../pages/landing/TrangChu"));
const TrangDatBan = lazy(() => import("../pages/landing/TrangDatBan"));
const TrangTraCuu = lazy(() => import("../pages/landing/TrangTraCuu"));
const TrangXacThuc = lazy(() => import("../pages/landing/TrangXacThuc"));
const TrangKhongCoQuyen = lazy(() => import("../pages/landing/TrangKhongCoQuyen"));
const QuanLyApp = lazy(() => import("./QuanLyApp"));

import { useAuth } from "../contexts/AuthContext";

const layDuongDan = () =>
  window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";

function DangTai() {
  return <div style={{ minHeight: "100vh" }} aria-busy="true" />;
}

function Router() {
  const [manHinh, setManHinh] = useState(layDuongDan);
  const [redirectSauDangNhap, setRedirectSauDangNhap] = useState("");

  const { isAuth } = useAuth();

  const dieuHuong = (manHinhMoi) => {
    if (manHinhMoi === "booking" && !isAuth) {
      setRedirectSauDangNhap("booking");
      window.history.pushState({}, "", "/login");
      setManHinh("login");
      window.scrollTo(0, 0);
      return;
    }

    window.history.pushState(
      {},
      "",
      manHinhMoi === "home" ? "/" : `/${manHinhMoi}`,
    );
    setManHinh(manHinhMoi);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const khiThayDoiLichSu = () => {
      const duongDanMoi = layDuongDan();
      if (duongDanMoi === "booking" && !isAuth) {
        setRedirectSauDangNhap("booking");
        window.history.pushState({}, "", "/login");
        setManHinh("login");
      } else {
        setManHinh(duongDanMoi);
      }
    };
    window.addEventListener("popstate", khiThayDoiLichSu);
    return () => window.removeEventListener("popstate", khiThayDoiLichSu);
  }, [isAuth]);

  const laXacThuc =
    manHinh === "auth" ||
    manHinh === "login" ||
    manHinh === "register" ||
    manHinh === "dang-nhap" ||
    manHinh === "dang-ky";

  const laKhongCoQuyen = manHinh === "403" || manHinh === "forbidden";
  const laQuanLy = manHinh.startsWith("admin") || manHinh.startsWith("pos");
  const khuVuc = manHinh.startsWith("admin") ? "admin" : "pos";

  const noiDung = laKhongCoQuyen ? (
    <TrangKhongCoQuyen
      onQuayVeTrangChu={() => dieuHuong("home")}
      onDangNhapKhac={() => dieuHuong("login")}
    />
  ) : laXacThuc ? (
    <TrangXacThuc
      defaultTab={
        manHinh === "register" || manHinh === "dang-ky" ? "register" : "login"
      }
      onDangNhapThanhCong={() => {
        const target = redirectSauDangNhap || "home";
        setRedirectSauDangNhap("");
        dieuHuong(target);
      }}
      onQuayVeTrangChu={() => dieuHuong("home")}
    />
  ) : laQuanLy ? (
    <QuanLyApp
      initialPage={manHinh.split("/")[1] || "dashboard"}
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
