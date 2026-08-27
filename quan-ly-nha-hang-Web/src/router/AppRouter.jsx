import { useEffect, useState } from "react";
import TrangChu from "../pages/landing/TrangChu";
import TrangDatBan from "../pages/landing/TrangDatBan";
import TrangTraCuu from "../pages/landing/TrangTraCuu";
import QuanTri from "../pages/admin/QuanTri";
import BanHang from "../pages/pos/BanHang";

const getRoute = () =>
  window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";

function AppRouter() {
  const [screen, setScreen] = useState(getRoute);

  const navigateTo = (nextScreen) => {
    window.history.pushState(
      {},
      "",
      nextScreen === "home" ? "/" : `/${nextScreen}`,
    );
    setScreen(nextScreen);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => setScreen(getRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (screen.startsWith("admin")) {
    const page = screen.split("/")[1] || "dashboard";
    return (
      <QuanTri
        initialPage={page}
        onNavigate={(nextPage) => navigateTo(`admin/${nextPage}`)}
      />
    );
  }

  if (screen.startsWith("pos")) {
    const page = screen.split("/")[1] || "dashboard";
    return (
      <BanHang
        initialPage={page}
        onNavigate={(nextPage) => navigateTo(`pos/${nextPage}`)}
      />
    );
  }

  if (screen === "booking") {
    return <TrangDatBan onBack={() => navigateTo("home")} />;
  }

  if (screen === "lookup") {
    return <TrangTraCuu onBack={() => navigateTo("home")} />;
  }

  return (
    <TrangChu
      onBookTable={() => navigateTo("booking")}
      onLookupBooking={() => navigateTo("lookup")}
    />
  );
}

export default AppRouter;
