import { useEffect, useState } from "react";
import { ANH } from "../../../assets/anh";

// Dữ liệu tạo hạt bụi vàng bay lơ lửng ngẫu nhiên
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.8 + 3) % 94}%`,
  top: `${(i * 13 + 7) % 90}%`,
  size: (i % 3) + 2,
  duration: `${7 + (i % 5) * 1.5}s`,
  delay: `${(i * 0.6) % 6}s`,
  opacity: 0.25 + (i % 4) * 0.12,
}));

/**
 * Thành phần nền kết nối toàn bộ Landing Page:
 * 1. MỘT ảnh nền không gian nhà hàng cố định liền mạch duy nhất (Single Seamless Canvas)
 * 2. Đốm sáng ấm áp theo con trỏ chuột (Interactive Candlelight Glow)
 * 3. Các cột chỉ dẫn kiến trúc dọc (Architectural Rhythm Lines)
 * 4. Hạt bụi vàng lung linh bay nhẹ nhàng (Ambient Floating Embers)
 */
export default function KetNoiKhongGian() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. MỘT ảnh nền không gian nhà hàng cố định liền mạch duy nhất xuyên suốt toàn trang */}
      <div className="absolute inset-0 z-0">
        <img
          src={ANH.hero}
          alt="Không gian nhà hàng L'Délice"
          className="w-full h-full object-cover brightness-[0.42] contrast-[1.08] transition-transform duration-300 ease-out"
          style={{
            transform: `scale(1.06) translateY(${Math.min(scrollY * 0.04, 80)}px)`,
          }}
        />
        {/* Lớp phủ chuyển sắc điện ảnh: sáng ấm ở phần đầu, sâu dần xuống các phần dưới */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#080604]/82 to-[#080604]/94" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(200, 136, 42, 0.1) 0%, rgba(8, 6, 4, 0.4) 50%, #080604 100%)",
          }}
        />
      </div>

      {/* 2. Parallax Calligraphic French Motto Watermark Layer */}
      <div
        className="absolute inset-0 flex flex-col justify-around items-center opacity-[0.03] pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${-scrollY * 0.06}px)`,
        }}
      >
        <span className="font-serif italic text-6xl sm:text-8xl md:text-9xl text-amber-200 tracking-widest whitespace-nowrap select-none">
          L'art de vivre &bull; L'art de recevoir
        </span>
        <span className="font-serif italic text-7xl sm:text-9xl md:text-[11rem] text-amber-200 tracking-widest whitespace-nowrap select-none">
          Haute Gastronomie Française
        </span>
        <span className="font-serif italic text-6xl sm:text-8xl md:text-9xl text-amber-200 tracking-widest whitespace-nowrap select-none">
          L'Délice &bull; Maison Fondée
        </span>
      </div>

      {/* 2. Architectural Vertical Guide Lines running through the entire page */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="w-px h-full bg-gradient-to-b from-amber-500/[0.01] via-amber-500/[0.05] to-amber-500/[0.01]" />
        <div className="hidden sm:block w-px h-full bg-gradient-to-b from-amber-500/[0.01] via-amber-500/[0.035] to-amber-500/[0.01]" />
        <div className="hidden md:block w-px h-full bg-gradient-to-b from-amber-500/[0.01] via-amber-500/[0.035] to-amber-500/[0.01]" />
        <div className="w-px h-full bg-gradient-to-b from-amber-500/[0.01] via-amber-500/[0.05] to-amber-500/[0.01]" />
      </div>

      {/* 2. Interactive Candlelight Cursor Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          opacity: isHovered ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(212, 150, 43, 0.055) 0%, rgba(200, 136, 42, 0.02) 35%, transparent 70%)",
        }}
      />

      {/* 3. Ambient Floating Amber Stardust / Embers */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#f59e0b",
            boxShadow: `0 0 ${p.size * 3}px rgba(245, 158, 11, 0.8)`,
            animation: `floatDrift ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Trục kết nối mỹ cảm giữa các Section:
 * Hiển thị sợi chỉ vàng kết hợp nút kim cương phát sáng
 */
export function DauNoiSection({ nhan }) {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center -my-6 sm:-my-7 pointer-events-none">
      {/* Upper Thread */}
      <div className="h-8 sm:h-10 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-amber-400" />

      {/* Center Diamond Node */}
      <div className="relative flex items-center justify-center my-0.5">
        <div className="w-3.5 h-3.5 rotate-45 border border-amber-400/80 bg-[#120b06] shadow-[0_0_10px_rgba(245,158,11,0.6)] flex items-center justify-center">
          <div className="w-1 h-1 rotate-45 bg-amber-400" />
        </div>
        {nhan && (
          <span className="absolute left-6 text-[9px] uppercase font-mono tracking-[0.2em] text-amber-400/70 whitespace-nowrap hidden lg:block select-none">
            {nhan}
          </span>
        )}
      </div>

      {/* Lower Thread */}
      <div className="h-8 sm:h-10 w-px bg-gradient-to-b from-amber-400 via-amber-400/40 to-transparent" />
    </div>
  );
}

