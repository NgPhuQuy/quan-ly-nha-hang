function Footer() {
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
            style={{ color: "rgba(240,216,144,.45)" }}
          >
            Hệ thống nhà hàng ẩm thực cao cấp với hơn 15 năm kiến tạo những trải
            nghiệm khó quên.
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider font-semibold"
            style={{ color: "rgba(200,136,42,.75)" }}
          >
            Chi nhánh
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.6)]">Quận 1, TP.HCM</p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">
            Tây Hồ, Hà Nội
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">
            Hải Châu, Đà Nẵng
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider font-semibold"
            style={{ color: "rgba(200,136,42,.75)" }}
          >
            Giờ mở cửa
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.6)]">
            T2 – T5: 11:00 – 22:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">
            T6 – T7: 10:00 – 23:00
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">
            CN: 10:00 – 22:00
          </p>
        </div>
        <div>
          <h4
            className="mb-3 text-xs uppercase tracking-wider font-semibold"
            style={{ color: "rgba(200,136,42,.75)" }}
          >
            Liên hệ
          </h4>
          <p className="text-xs text-[rgba(240,216,144,.6)]">
            Hotline: 1800 5678
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">
            cskh@5sdining.vn
          </p>
          <p className="mt-2 text-xs text-[rgba(240,216,144,.6)]">Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
