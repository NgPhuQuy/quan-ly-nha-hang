import { MapPin, Calendar, Clock, Users, Sparkles } from "lucide-react";

function BookingSummary({
  branch,
  date,
  time,
  guestCount,
  selectedItems,
  selectedServices,
  danhSachMonAn,
  dichVuBoSung,
}) {
  const branchName = branch?.tenChiNhanh || "Chưa chọn chi nhánh";
  const branchAddress = branch?.diaChi;

  const totalFoodAmount = selectedItems.reduce((total, item) => {
    const dish = danhSachMonAn.find((m) => m.maMatHang === (item.maMatHang || item.monAnId));
    const donGia = dish?.giaMatHang ?? item.giaMatHang ?? 0;
    return total + Number(donGia) * item.soLuong;
  }, 0);

  const totalServiceAmount = selectedServices.reduce((total, id) => {
    const s = dichVuBoSung.find((service) => (service.maMatHang || service.id) === id);
    const donGia = s?.giaMatHang ?? s?.gia ?? 0;
    return total + Number(donGia);
  }, 0);

  const totalAmount = totalFoodAmount + totalServiceAmount;

  return (
    <aside className="rounded-3xl p-5 bg-gradient-to-b from-[#140e08] to-[#0c0905] border border-amber-500/30 backdrop-blur-md shadow-2xl lg:sticky lg:top-24 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
          <Sparkles size={14} className="text-amber-400" />
          <span>Tóm Tắt Đặt Bàn</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
          Live
        </span>
      </div>

      {/* Booking specs */}
      <div className="space-y-3 text-xs">
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
          <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] text-amber-200/50 block uppercase">
              Chi nhánh
            </span>
            <span className="font-serif font-bold text-amber-100 block truncate">
              {branchName}
            </span>
            {branchAddress && (
              <span className="text-[10px] text-amber-200/50 block truncate">
                {branchAddress}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
            <Calendar size={14} className="text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-amber-200/50 block uppercase">
                Ngày
              </span>
              <span className="font-semibold text-amber-100 font-mono">
                {date || "Chưa chọn"}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
            <Clock size={14} className="text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-amber-200/50 block uppercase">
                Giờ đến
              </span>
              <span className="font-semibold text-amber-100 font-mono">
                {time || "Chưa chọn"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <Users size={14} className="text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-amber-200/50 block uppercase">
              Số lượng khách
            </span>
            <span className="font-semibold text-amber-100">
              {guestCount} người
            </span>
          </div>
        </div>
      </div>

      {/* Selected Items Breakdown */}
      {selectedItems.length > 0 && (
        <div className="pt-3 border-t border-amber-500/15 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold uppercase tracking-wider">
            <span>Món đặt trước ({selectedItems.length})</span>
            <span>Tạm tính</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {selectedItems.map((item) => {
              const dish = danhSachMonAn.find((m) => m.maMatHang === (item.maMatHang || item.monAnId));
              const ten = dish?.tenMatHang || item.tenMatHang || item.ten || "Món ăn";
              const gia = dish?.giaMatHang ?? item.giaMatHang ?? item.gia ?? 0;
              return (
                <div
                  key={item.maMatHang || item.monAnId}
                  className="flex items-center justify-between text-[11px] text-amber-200/80"
                >
                  <span className="truncate max-w-[140px]">
                    {ten}{" "}
                    <strong className="text-amber-400">×{item.soLuong}</strong>
                  </span>
                  <span className="font-mono text-amber-200">
                    {(Number(gia) * item.soLuong).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected VIP Services Breakdown */}
      {selectedServices.length > 0 && (
        <div className="pt-2 border-t border-amber-500/15 space-y-1.5">
          <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
            Dịch vụ bổ sung:
          </div>
          {selectedServices.map((sId) => {
            const s = dichVuBoSung.find((x) => x.maMatHang === sId);
            if (!s) return null;
            return (
              <div
                key={sId}
                className="flex items-center justify-between text-[11px] text-amber-200/80"
              >
                <span>
                  {s.tenMatHang}
                </span>
                <span className="font-mono text-amber-200">
                  {Number(s.giaMatHang || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Total Amount Card */}
      <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-amber-200/60 block uppercase font-medium">
            Chi phí ước tính
          </span>
          <span className="text-[10px] text-amber-400/80">
            {totalAmount > 0 ? "Thanh toán tại bàn" : "Đặt cọc: 0₫"}
          </span>
        </div>
        <div className="text-right">
          <span className="font-serif text-lg font-bold text-amber-300">
            {totalAmount > 0
              ? `${totalAmount.toLocaleString("vi-VN")}₫`
              : "Miễn phí đặt bàn"}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default BookingSummary;
