import { Sparkles, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-amber-500/20 bg-[#080503] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-amber-200/60"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-500/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Sparkles size={16} />
              </div>
              <span className="font-serif text-lg font-bold text-amber-100">
                5S DINING
              </span>
            </div>
            <p className="text-xs leading-relaxed text-amber-200/60">
              Kiến tạo những chuẩn mực mới trong thế giới ẩm thực Fine Dining.
              Mỗi món ăn là một tác phẩm nghệ thuật, mỗi bữa tiệc là một kỷ niệm
              vô giá.
            </p>
            <div className="flex items-center gap-3 pt-2 text-amber-400">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-300 transition-colors"
                title="Website"
              >
                <Globe size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-300 transition-colors font-bold text-xs"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-300 transition-colors font-bold text-xs"
                title="Instagram"
              >
                in
              </a>
            </div>
          </div>

          {/* Col 2: Hệ Thống Chi Nhánh */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-100 uppercase tracking-wider">
              Chi Nhánh
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Chi nhánh Quận 1: 123 Đồng Khởi, Bến Nghé, Q.1, TP.HCM
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Chi nhánh Tây Hồ: 45 Xuân Diệu, Quảng An, Tây Hồ, Hà Nội
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Chi nhánh Hải Châu: 88 Bạch Đằng, Hải Châu, Đà Nẵng</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Giờ Mở Cửa */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-100 uppercase tracking-wider">
              Giờ Phục Vụ
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-amber-400 shrink-0" />
                <span>Thứ 2 – Thứ 5: 11:00 – 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-amber-400 shrink-0" />
                <span>Thứ 6 – Thứ 7: 10:30 – 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-amber-400 shrink-0" />
                <span>Chủ Nhật: 10:30 – 22:30</span>
              </div>
              <p className="text-[11px] text-amber-400/70 pt-1 italic">
                * Nhận bàn đặt muộn nhất trước giờ đóng cửa 45 phút.
              </p>
            </div>
          </div>

          {/* Col 4: Liên Hệ & CSKH */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-100 uppercase tracking-wider">
              Chăm Sóc Khách Hàng
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-amber-400 shrink-0" />
                <span className="font-mono text-amber-300 font-bold">
                  1800 5678 (Miễn phí)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-amber-400 shrink-0" />
                <span>reservation@5sdining.vn</span>
              </div>
              <p className="text-[11px] text-amber-200/50 pt-2">
                Hỗ trợ đặt bàn tiệc hội nghị, sinh nhật, tiệc rượu & sự kiện VIP
                theo yêu cầu.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/40 gap-4">
          <p>
            © {new Date().getFullYear()} 5S Dining Restaurant Chain. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-300 transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Quy định đặt bàn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
