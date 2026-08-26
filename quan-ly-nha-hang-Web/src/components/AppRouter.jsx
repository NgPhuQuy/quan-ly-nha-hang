import { useState } from "react";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import BookingLookupPage from "../pages/BookingLookupPage";

function AppRouter() {
  const [screen, setScreen] = useState("home");

  const navigateTo = (nextScreen) => {
    setScreen(nextScreen);
    window.scrollTo(0, 0);
  };

  if (screen === "booking") {
    return <BookingPage onBack={() => navigateTo("home")} />;
  }

  if (screen === "lookup") {
    return <BookingLookupPage onBack={() => navigateTo("home")} />;
  }

  return <HomePage onBookTable={() => navigateTo("booking")} onLookupBooking={() => navigateTo("lookup")} />;
}

export default AppRouter;
