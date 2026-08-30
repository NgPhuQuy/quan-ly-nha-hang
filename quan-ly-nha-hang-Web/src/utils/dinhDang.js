/**
 * Định dạng tiền tệ VND chuẩn (Ví dụ: 1.250.000₫)
 */
export function dinhDangTien(soTien) {
  if (soTien === undefined || soTien === null || isNaN(soTien)) return "0₫";
  return Number(soTien).toLocaleString("vi-VN") + "₫";
}

/**
 * Định dạng tiền tệ rút gọn (Ví dụ: 1.5tr, 500k)
 */
export function dinhDangTienRutGon(soTien) {
  if (!soTien || isNaN(soTien)) return "0₫";
  if (soTien >= 1e9) return `${(soTien / 1e9).toFixed(1)} tỷ`;
  if (soTien >= 1e6) return `${(soTien / 1e6).toFixed(1)}tr`;
  if (soTien >= 1e3) return `${(soTien / 1e3).toFixed(0)}k`;
  return dinhDangTien(soTien);
}

/**
 * Định dạng ngày (YYYY-MM-DD -> DD/MM/YYYY)
 */
export function dinhDangNgay(ngayStr) {
  if (!ngayStr) return "";
  try {
    const parts = String(ngayStr).slice(0, 10).split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return ngayStr;
  } catch {
    return ngayStr;
  }
}

/**
 * Định dạng ngày giờ đầy đủ
 */
export function dinhDangNgayGio(ngayGioStr) {
  if (!ngayGioStr) return "";
  try {
    const d = new Date(ngayGioStr);
    if (isNaN(d.getTime())) return ngayGioStr;
    const gio = String(d.getHours()).padStart(2, "0");
    const phut = String(d.getMinutes()).padStart(2, "0");
    const ngay = String(d.getDate()).padStart(2, "0");
    const thang = String(d.getMonth() + 1).padStart(2, "0");
    const nam = d.getFullYear();
    return `${gio}:${phut} ${ngay}/${thang}/${nam}`;
  } catch {
    return ngayGioStr;
  }
}

/**
 * Lấy nhãn tháng/năm hiện tại (Ví dụ: "Tháng 8/2026")
 */
export function layThangHienTai() {
  const d = new Date();
  return `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
}

/**
 * Sinh danh sách N tháng gần nhất theo thời gian thực (không hardcode)
 */
export function taoDanhSachThangGanNhat(soThang = 6) {
  const d = new Date();
  const danhSach = [];
  for (let i = 0; i < soThang; i++) {
    const targetDate = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const thang = targetDate.getMonth() + 1;
    const nam = targetDate.getFullYear();
    danhSach.push(`Tháng ${thang}/${nam}`);
  }
  return danhSach;
}

/**
 * Bản đồ màu sắc trạng thái dùng chung cho các bảng/thẻ
 */
export const MAU_TRANG_THAI = {
  // Trạng thái bàn
  Trống: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Đang phục vụ": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  "Đã đặt trước": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },

  // Trạng thái hóa đơn / đặt lịch
  "Hoàn thành": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Đang phục vụ": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  "Chờ xử lý": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  "Chờ xác nhận": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  "Đã xác nhận": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Đã hủy": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  "Đã huỷ": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },

  // Trạng thái khuyến mãi / chi nhánh / món
  "Đang chạy": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Chờ chạy": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  "Đã kết thúc": {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
  },
  "Hoạt động": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Tạm đóng": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  "Đang bán": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Hết món": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
};
