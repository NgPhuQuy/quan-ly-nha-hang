export const chuanHoaVaiTro = (vaiTro) => {
  if (!vaiTro) return '';
  return String(vaiTro).toUpperCase().trim().replace(/^ROLE_/, '');
};

