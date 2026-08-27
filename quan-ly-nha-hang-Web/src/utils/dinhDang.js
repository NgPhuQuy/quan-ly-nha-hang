export function dinhDangTien(soTien) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(soTien);
}

export function dinhDangTienRutGon(soTien) {
  if (soTien >= 1e9) return `${(soTien / 1e9).toFixed(1)} tỷ`;
  if (soTien >= 1e6) return `${(soTien / 1e6).toFixed(1)}tr`;
  if (soTien >= 1e3) return `${(soTien / 1e3).toFixed(0)}k`;
  return soTien.toString();
}
