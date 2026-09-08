export const layThongBaoLoi = (error) => {
  if (!error?.response) {
    if (error?.code === 'ECONNABORTED') {
      return 'Kết nối đến máy chủ bị quá hạn (timeout). Vui lòng thử lại!';
    }
    return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!';
  }

  const data = error.response?.data;
  if (!data) return "Máy chủ trả về mã lỗi HTTP " + error.response.status;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.join('\n• ');
  }

  return data.message;
};

export const trichXuatLoi = (error) => {
  if (!error?.response) {
    return {
      status: 0,
      error: 'NETWORK_ERROR',
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!',
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

