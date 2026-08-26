const badgeStyles = {
  active: { bg: "#dcfce7", color: "#15803d", label: "Hoạt động" },
  inactive: { bg: "#f1f5f9", color: "#64748b", label: "Tạm dừng" },
  paid: { bg: "#dcfce7", color: "#15803d", label: "Đã thanh toán" },
  pending: { bg: "#fef9c3", color: "#92400e", label: "Chờ xử lý" },
  cancelled: { bg: "#fee2e2", color: "#b91c1c", label: "Đã hủy" },
  confirmed: { bg: "#dbeafe", color: "#1d4ed8", label: "Đã xác nhận" },
  available: { bg: "#dcfce7", color: "#15803d", label: "Trống" },
  occupied: { bg: "#fee2e2", color: "#b91c1c", label: "Đang dùng" },
  reserved: { bg: "#fef9c3", color: "#92400e", label: "Đã đặt" },
  upcoming: { bg: "#dbeafe", color: "#1d4ed8", label: "Sắp diễn ra" },
  expired: { bg: "#f1f5f9", color: "#64748b", label: "Hết hạn" },
  thu: { bg: "#dcfce7", color: "#15803d", label: "Thu" },
  chi: { bg: "#fee2e2", color: "#b91c1c", label: "Chi" },
};

export default function Badge({ status }) {
  const style = badgeStyles[status] ?? { bg: "#f1f5f9", color: "#64748b", label: status };
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: style.bg, color: style.color, whiteSpace: "nowrap" }}>{style.label}</span>;
}
