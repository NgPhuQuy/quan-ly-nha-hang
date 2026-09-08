/**
 * Trich xuat loi chuan tu API call o Client.
 * Triet ly:
 * - Loi duy nhat client quan ly: API khong den duoc BE (mat mang, server sap, timeout).
 * - Con lai: Tin tuong 100% JSON BE tra ve (status, error, message, errors).
 */

export const layThongBaoLoi = (error, fallback = 'Đã xảy ra lỗi, vui lòng thử lại!') => {
  // 1. API khong den duoc BE (mat ket noi / timeout / server sap)
  if (!error?.response) {
    if (error?.code === 'ECONNABORTED') {
      return 'Kết nối đến máy chủ bị quá hạn (timeout). Vui lòng thử lại!';
    }
    return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc đảm bảo backend đang hoạt động!';
  }

  // 2. BE da nhan va tra ve JSON chuan
  if (!data) return "Máy chủ trả về mã lỗi HTTP " + error.response.status;

  // Truong hop validation tra ve mang errors
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.join('\n• ');
  }

  // Lay message hoac thongBao tu JSON BE
  return data.message || data.thongBao || data.error || fallback;
};

export const trichXuatLoi = (error) => {
  if (!error?.response) {
    return {
      status: 0,
      error: 'NETWORK_ERROR',
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc đảm bảo backend đang hoạt động!',
      errors: [],
      laLoiKetNoi: true,
    };
  }

  const { status, data } = error.response;
  return {
    status,
    error: data?.error || ("HTTP_" + status),
    message: layThongBaoLoi(error),
    errors: Array.isArray(data?.errors) ? data.errors : [],
    laLoiKetNoi: false,
  };
};

