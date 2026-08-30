import { useState } from "react";
import { mutedCream, subtleGoldBorder } from "../../../themes";

function NavigationBar({ onDatBan, onTraCuuDatBan }) {
  const [isMoMenu, setIsMoMenu] = useState(false);
  const handleDongMenu = () => setIsMoMenu(false);
  const handleDatBan = () => {
    handleDongMenu();
    onDatBan();
  };
  const handleTraCuuDatBan = () => {
    handleDongMenu();
    onTraCuuDatBan();
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full"
      style={{
        background: "linear-gradient(180deg,rgba(12,9,5,.88),transparent)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-10">
        <a href="#" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L26 22H2Z"
              fill="none"
              stroke="rgba(200,136,42,.9)"
              strokeWidth="1.5"
            />
            <circle
              cx="14"
              cy="14"
              r="3.5"
              fill="rgba(200,136,42,.18)"
              stroke="rgba(200,136,42,.55)"
              strokeWidth="1"
            />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.05rem",
              color: "rgba(240,216,144,.95)",
            }}
          >
            5S Dining
          </span>
        </a>
        <div
          className="hidden items-center gap-7 text-sm md:flex"
          style={{ color: mutedCream }}
        >
          <a href="#menu" className="transition-colors hover:text-amber-300">
            Thực đơn
          </a>
          <a
            href="#branches"
            className="transition-colors hover:text-amber-300"
          >
            Chi nhánh
          </a>
          <a href="#about" className="transition-colors hover:text-amber-300">
            Về chúng tôi
          </a>
          <a href="#contact" className="transition-colors hover:text-amber-300">
            Liên hệ
          </a>
          <button
            onClick={handleTraCuuDatBan}
            className="transition-colors hover:text-amber-300"
          >
            Tra cứu đặt bàn
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDatBan}
            className="btn-primary rounded-full px-4 py-2 text-sm sm:px-5"
          >
            Đặt bàn ngay
          </button>
          <button
            onClick={() => setIsMoMenu((isOpen) => !isOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 md:hidden"
            style={{ color: "rgba(200,136,42,.7)" }}
          >
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "translate-y-1.5 rotate-45" : ""}`}
              style={{ background: "currentColor" }}
            />
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "opacity-0" : ""}`}
              style={{ background: "currentColor" }}
            />
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "-translate-y-1.5 -rotate-45" : ""}`}
              style={{ background: "currentColor" }}
            />
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all md:hidden ${isMoMenu ? "max-h-56" : "max-h-0"}`}
        style={{
          background: "rgba(12,9,5,.97)",
          borderTop: isMoMenu ? `1px solid ${subtleGoldBorder}` : "none",
        }}
      >
        <div className="space-y-3 px-5 py-4">
          <a
            href="#menu"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Thực đơn
          </a>
          <a
            href="#branches"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Chi nhánh
          </a>
          <a
            href="#about"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Về chúng tôi
          </a>
          <a
            href="#contact"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Liên hệ
          </a>
          <button
            onClick={handleTraCuuDatBan}
            className="block w-full text-left text-sm"
            style={{ color: mutedCream }}
          >
            Tra cứu đặt bàn
          </button>
        </div>
      </div>
    </nav>
  );
}
export default NavigationBar;
