function ChanTrang() {
  return (
    <footer
      id="contact"
      className="border-t px-4 py-14 sm:px-10"
      style={{ background: "#0a0704", borderColor: "rgba(200,136,42,.08)" }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p
            className="font-serif text-lg"
            style={{ color: "rgba(240,216,144,.85)" }}
          >
            5S Dining
          </p>
          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "rgba(240,216,144,.28)" }}
          >
            Chuỗi nhà hàng cao cấp với hơn 15 năm kinh nghiệm phục vụ những
            khoảnh khắc đáng nhớ.
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Chi nhánh
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">Hoàn Kiếm</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">Tây Hồ</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">Ba Đình</p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Giờ mở cửa
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">
            T2–T5: 11:00–22:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            T6–T7: 10:00–23:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            CN: 10:00–22:00
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider"
            style={{ color: "rgba(200,136,42,.52)" }}
          >
            Liên hệ
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.3)]">1800 5678</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            hello@5sdining.vn
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.3)]">
            Hà Nội, Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
export default ChanTrang;
