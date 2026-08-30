import { useEffect, useRef } from "react";
import { ANH } from "../../../assets/anh";
import { heroOverlay } from "../../../themes";

function Hero({ onDatBan }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleHieuUngCuon = () => {
      if (!imageRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      imageRef.current.style.transform = `scale(1.1) translateY(${progress * 50}px)`;
    };
    window.addEventListener("scroll", handleHieuUngCuon, { passive: true });
    return () => window.removeEventListener("scroll", handleHieuUngCuon);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[520px] items-center justify-center overflow-hidden bg-[#0c0905]"
    >
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src={ANH.hero}
          alt="Không gian nhà hàng 5S Dining"
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0" style={{ background: heroOverlay }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 55%,rgba(200,136,42,0.07) 0%,transparent 58%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p
          className="fade-in-up delay-1 mb-5 text-xs uppercase font-semibold"
          style={{ color: "rgba(200,136,42,.8)", letterSpacing: ".25em" }}
        >
          Ẩm thực thượng hạng tại Hà Nội & TP.HCM
        </p>
        <h1
          className="fade-in-up delay-2 mb-5 leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem,6.5vw,4.5rem)",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "rgba(250,243,224,.94)" }}>Một bàn tiệc,</span>
          <br />
          <span className="gold-shimmer">trọn khoảnh khắc</span>
        </h1>
        <p
          className="fade-in-up delay-3 mx-auto mb-9 max-w-lg text-sm sm:text-base"
          style={{ color: "rgba(240,216,144,.58)", lineHeight: 1.78 }}
        >
          Mỗi bữa tiệc tại 5S Dining là một trải nghiệm khó quên. Hãy đặt chỗ
          trước để chúng tôi chuẩn bị đón tiếp quý khách chu đáo nhất.
        </p>
        <div className="fade-in-up delay-4 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onDatBan}
            className="btn-primary rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Đặt bàn ngay
          </button>
          <a
            href="#branches"
            className="btn-ghost flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Khám phá chi nhánh
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ color: "rgba(200,136,42,.35)" }}
      >
        <span className="text-xs uppercase tracking-widest">
          Cuộn để khám phá
        </span>
        <div
          className="h-7 w-px"
          style={{
            background:
              "linear-gradient(180deg,rgba(200,136,42,.35),transparent)",
          }}
        />
      </div>
    </section>
  );
}
export default Hero;
