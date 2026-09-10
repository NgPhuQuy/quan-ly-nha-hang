import { lazy, Suspense, useEffect, useState } from "react";

const TrangChu = lazy(() => import("../pages/landing/TrangChu"));
const TrangDatBan = lazy(() => import("../pages/landing/TrangDatBan"));
const TrangDatLichCuaToi = lazy(() => import("../pages/landing/TrangDatLichCuaToi"));
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

  const laTrangCanDangNhap = (path) =>
    path === "booking" ||
    path === "my-bookings" ||
    path === "lich-dat-cua-toi" ||
    path === "dat-lich-cua-toi";

  const dieuHuong = (manHinhMoi) => {
    if (laTrangCanDangNhap(manHinhMoi) && !isAuth) {
      setRedirectSauDangNhap(manHinhMoi);
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
      if (laTrangCanDangNhap(duongDanMoi) && !isAuth) {
        setRedirectSauDangNhap(duongDanMoi);
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
  const laLichDatCuaToi =
    manHinh === "my-bookings" ||
    manHinh === "lich-dat-cua-toi" ||
    manHinh === "dat-lich-cua-toi";

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
      initialPage={(manHinh.split("/")[1] || "tong_quan").replace(/-/g, "_")}
      khuVuc={khuVuc}
      onNavigate={(trangMoi) => dieuHuong(`${khuVuc}/${trangMoi}`)}
      onQuayVeTrangChu={() => dieuHuong("home")}
    />
  ) : manHinh === "booking" ? (
    <TrangDatBan onQuayLai={() => dieuHuong("home")} />
  ) : laLichDatCuaToi ? (
    <TrangDatLichCuaToi
      onQuayLai={() => dieuHuong("home")}
      onDatBan={() => dieuHuong("booking")}
    />
  ) : (
    <TrangChu
      onDatBan={() => dieuHuong("booking")}
      onDangNhap={() => dieuHuong("login")}
      onDangKy={() => dieuHuong("register")}
      onLichDatCuaToi={() => dieuHuong("my-bookings")}
    />
  );

  return <Suspense fallback={<DangTai />}>{noiDung}</Suspense>;
}

export default Router;
