import { ANH } from "../../assets/anh";
import { lopPhuHero } from "../../themes";

function PhanGioiThieu({ khiDatBan }) {
  return (
    <section className="relative flex h-[100svh] min-h-[520px] items-center justify-center overflow-hidden bg-[#0c0905]">
      <div className="absolute inset-0">
        <img
          src={ANH.hero}
          alt="Không gian 5S Dining"
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0" style={{ background: lopPhuHero }} />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p
          className="fade-in-up delay-1 mb-5 text-xs uppercase"
          style={{ color: "rgba(200,136,42,.8)", letterSpacing: ".25em" }}
        >
          Chuỗi nhà hàng cao cấp · Hà Nội
        </p>
        <h1
          className="fade-in-up delay-2 mb-5 leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem,6.5vw,4.5rem)",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "rgba(250,243,224,.94)" }}>Một chỗ ngồi,</span>
          <br />
          <span className="gold-shimmer">một câu chuyện</span>
        </h1>
        <p
          className="fade-in-up delay-3 mx-auto mb-9 max-w-lg"
          style={{ color: "rgba(240,216,144,.58)", lineHeight: 1.78 }}
        >
          Mỗi bữa ăn tại 5S là một kỷ niệm. Đặt bàn trước để chúng tôi chuẩn bị
          trọn vẹn cho bạn.
        </p>
        <div className="fade-in-up delay-4 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={khiDatBan}
            className="btn-primary rounded-full px-7 py-3.5"
          >
            Đặt bàn ngay
          </button>
          <a
            href="#branches"
            className="btn-ghost flex items-center justify-center rounded-full px-7 py-3.5"
          >
            Khám phá chi nhánh
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest"
        style={{ color: "rgba(200,136,42,.35)" }}
      >
        Cuộn xuống
      </div>
    </section>
  );
}
export default PhanGioiThieu;
