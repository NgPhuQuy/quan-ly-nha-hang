import { useEffect, useState } from "react";
import HomePage from "../pages/home/HomePage";
import BookingPage from "../pages/booking/BookingPage";
import BookingLookupPage from "../pages/booking/BookingLookupPage";
import AdminApp from "../pages/admin/AdminApp";
import PosApp from "../pages/pos/PosApp";

const getRoute = () => window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";

function AppRouter() {
  const [screen, setScreen] = useState(getRoute);

  const navigateTo = (nextScreen) => {
    window.history.pushState({}, "", nextScreen === "home" ? "/" : `/${nextScreen}`);
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
    return <AdminApp initialPage={page} onNavigate={(nextPage) => navigateTo(`admin/${nextPage}`)} />;
  }

  if (screen.startsWith("pos")) {
    const page = screen.split("/")[1] || "dashboard";
    return <PosApp initialPage={page} onNavigate={(nextPage) => navigateTo(`pos/${nextPage}`)} />;
  }

  if (screen === "booking") {
    return <BookingPage onBack={() => navigateTo("home")} />;
  }

  if (screen === "lookup") {
    return <BookingLookupPage onBack={() => navigateTo("home")} />;
  }

  return <HomePage onBookTable={() => navigateTo("booking")} onLookupBooking={() => navigateTo("lookup")} />;
}

export default AppRouter;
