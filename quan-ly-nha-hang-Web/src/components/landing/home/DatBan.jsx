function DatBan({ onDatBan, onTraCuuDatBan }) {
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
          Sẵn sàng cho một buổi tối đặc biệt?
        </h2>
        <p className="mb-8 text-sm" style={{ color: "rgba(240,216,144,.42)" }}>
          Đặt bàn ngay hôm nay để thưởng thức không gian ẩm thực tinh hoa cùng dịch vụ tận tâm tại 5S Dining.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onDatBan}
            className="btn-primary rounded-full px-8 py-3.5 text-sm font-medium"
          >
            Đặt bàn trực tuyến
          </button>
          <button
            onClick={onTraCuuDatBan}
            className="btn-ghost rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Tra cứu đặt bàn
          </button>
        </div>
      </div>
    </section>
  );
}

export default DatBan;

