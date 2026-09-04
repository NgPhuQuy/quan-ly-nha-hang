import { useState } from "react";
import { Sparkles, ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

const DANH_SACH_CAU_HOI = [
  {
    cauHoi: "Nhà hàng có yêu cầu về quy tắc trang phục (Dress code) không?",
    cauTraLoi:
      "Để gìn giữ không gian ẩm thực thanh lịch và trọn vẹn cảm xúc cho tất cả thực khách, chúng tôi khuyến khích quý khách diện trang phục Lịch thiệp / Bán trang trọng (Smart Casual). Vui lòng hạn chế mặc trang phục thể thao, áo ba lỗ hoặc dép lê khi dùng bữa tại nhà hàng.",
  },
  {
    cauHoi: "Tôi muốn đặt phòng tiệc riêng (VIP Room) cho đối tác hoặc gia đình thì sao?",
    cauTraLoi:
      "Toàn bộ hệ thống chi nhánh L'Délice đều trang bị các phòng VIP thượng hạng với hệ thống cách âm cao cấp, sức chứa từ 6 đến 24 khách, thích hợp cho các buổi ký kết, gặp gỡ đối tác hoặc tiệc kỷ niệm. Quý khách vui lòng chọn loại phòng khi đặt bàn hoặc liên hệ hotline để được phục vụ chu đáo nhất.",
  },
  {
    cauHoi: "Nhà hàng có thực đơn chay hoặc phục vụ người có yêu cầu dị ứng thực phẩm không?",
    cauTraLoi:
      "Có. Đội ngũ Bếp trưởng luôn sẵn lòng chuẩn bị thực đơn chay thanh đạm tinh tế (Plant-based Fine Dining) và linh hoạt điều chỉnh thành phần món ăn theo dị ứng riêng (hải sản, gluten, bơ sữa...). Quý khách chỉ cần để lại ghi chú khi đặt bàn trực tuyến.",
  },
  {
    cauHoi: "Chính sách thay đổi hoặc hủy lịch đặt bàn như thế nào?",
    cauTraLoi:
      "Quý khách có thể dễ dàng tra cứu, thay đổi hoặc hủy lịch đặt trực tuyến trước giờ hẹn tối thiểu 2 giờ bằng Mã Đặt Chỗ nhận được. Đối với các bàn tiệc sự kiện lớn hoặc phòng VIP đã cọc, nhân viên CSKH sẽ liên hệ hỗ trợ bảo lưu lịch linh hoạt trong 30 ngày.",
  },
  {
    cauHoi: "Chi nhánh có bãi đỗ xe ô tô và dịch vụ giữ xe không?",
    cauTraLoi:
      "Tất cả các chi nhánh của chúng tôi đều sở hữu bãi đỗ xe ô tô và xe máy rộng rãi, an ninh 24/7. Đội ngũ nhân viên đón tiếp (Valet Parking) luôn sẵn sàng hỗ trợ quý khách gửi và lấy xe hoàn toàn miễn phí.",
  },
];

function CauHoiThuongGap() {
  const [moIndex, setMoIndex] = useState(0);

  const toggle = (idx) => {
    setMoIndex(moIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      className="px-4 py-24 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden scroll-mt-16"
    >

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Thông Tin Dành Cho Thực Khách</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Những Điều Quý Khách Quan Tâm
          </h2>

          <p className="text-sm sm:text-base text-amber-200/70 font-light leading-relaxed">
            Mọi chuẩn bị chu đáo đều hướng đến một trải nghiệm dùng bữa trọn vẹn và an tâm nhất tại L'Délice.
          </p>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {DANH_SACH_CAU_HOI.map((item, idx) => {
            const isMo = moIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                  isMo
                    ? "bg-[#1c130b]/90 border-amber-500/40 shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
                    : "bg-white/[0.02] border-amber-500/15 hover:border-amber-500/30 hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-amber-100/90 leading-snug">
                    {item.cauHoi}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isMo
                        ? "rotate-180 bg-amber-400 text-black border-amber-400"
                        : "bg-white/5 text-amber-400/80 border-amber-500/20"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isMo && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-amber-200/75 font-light leading-relaxed border-t border-amber-500/10">
                    {item.cauTraLoi}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-100">Quý khách có yêu cầu đặc biệt riêng?</p>
              <p className="text-[11px] text-amber-200/60">Bộ phận Lễ tân & Đón tiếp luôn sẵn sàng hỗ trợ trực tiếp 24/7</p>
            </div>
          </div>
          <a
            href="tel:18005678"
            className="px-5 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-md"
          >
            Hotline: 1800 5678
          </a>
        </div>
      </div>
    </section>
  );
}

export default CauHoiThuongGap;
