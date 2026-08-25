function KeuGoiDatBan({ khiDatBan, khiTraCuu }) {
  return (
    <section
      className="px-4 py-20 text-center"
      style={{ background: "var(--color-warm-black)" }}
    >
      <div className="mx-auto max-w-xl">
        <h2
          className="mb-4 font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.85)" }}
        >
          Sẵn sàng cho buổi tối đặc biệt?
        </h2>
        <p className="mb-8" style={{ color: "rgba(240,216,144,.42)" }}>
          Đặt bàn ngay hôm nay — chỗ luôn có nhưng thời điểm đẹp thì không chờ
          ai.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={khiDatBan}
            className="btn-primary rounded-full px-8 py-3.5"
          >
            Chọn bàn của tôi
          </button>
          <button
            onClick={khiTraCuu}
            className="btn-ghost rounded-full px-7 py-3.5"
          >
            Tra cứu đặt bàn
          </button>
        </div>
      </div>
    </section>
  );
}
export default KeuGoiDatBan;
