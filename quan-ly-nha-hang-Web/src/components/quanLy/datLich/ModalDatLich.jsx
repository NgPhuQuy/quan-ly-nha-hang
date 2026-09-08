import { Utensils, X } from "lucide-react";

export function ModalGanBan({
  checkInBooking,
  onClose,
  selectedTableId,
  setSelectedTableId,
  tables,
  onConfirmCheckIn,
}) {
  if (!checkInBooking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-700">Xếp bàn & Check-in</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="text-xs space-y-1.5 text-gray-600">
          <p>
            <strong>Mã đặt:</strong> #{checkInBooking.maDatLich}
          </p>
          <p>
            <strong>Số khách:</strong> {checkInBooking.soKhach} người
          </p>
          <p>
            <strong>Thời gian:</strong> {checkInBooking.gio} - {checkInBooking.ngay}
          </p>
        </div>
        <div>
          <label className="block text-xs font-600 mb-1">
            Chọn bàn phục vụ:
          </label>
          <select
            value={selectedTableId}
            onChange={(e) => setSelectedTableId(e.target.value)}
            className="w-full text-xs border rounded-lg p-2 outline-none font-semibold focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">-- Chọn bàn trống --</option>
            {tables.map((t) => (
              <option key={t.maBan} value={t.maBan}>
                {t.soBan} ({t.sucChua} chỗ - {t.trangThai})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-600 border cursor-pointer hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirmCheckIn}
            className="px-4 py-1.5 rounded-lg text-xs font-700 text-white cursor-pointer shadow-sm"
            style={{ background: "var(--primary)" }}
          >
            Xác nhận Check-in
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalMonDatTruoc({ viewPreOrderBooking, onClose }) {
  if (!viewPreOrderBooking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-700 flex items-center gap-1.5">
            <Utensils size={15} style={{ color: "var(--primary)" }} /> Món ăn
            đặt trước (#{viewPreOrderBooking.maDatLich})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-2 text-xs divide-y">
          {viewPreOrderBooking.listDatTruoc.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center pt-2">
              <span className="font-semibold">
                {item.tenMatHang || `Món #${item.maMatHang}`}
              </span>
              <span className="font-bold text-amber-600">×{item.soLuong}</span>
            </div>
          ))}
        </div>
        <div className="text-right pt-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-600 border cursor-pointer hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalTaoDatLich({
  show,
  onClose,
  formData,
  setFormData,
  branches,
  onSubmit,
  thongBaoLoi,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-700">Tạo Đặt Lịch Mới</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {thongBaoLoi && (
          <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {thongBaoLoi}
          </div>
        )}

        <div className="space-y-2.5 text-xs">
          <div>
            <label className="block font-600 mb-1">Chi nhánh:</label>
            <select
              value={formData.maChiNhanh}
              onChange={(e) =>
                setFormData({ ...formData, maChiNhanh: e.target.value })
              }
              className="w-full border rounded-lg p-2 font-medium"
            >
              {branches.map((b) => (
                <option key={b.maChiNhanh} value={b.maChiNhanh}>
                  {b.tenChiNhanh}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-600 mb-1">Họ tên khách:</label>
              <input
                type="text"
                required
                value={formData.hoTen}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="block font-600 mb-1">Số điện thoại:</label>
              <input
                type="text"
                required
                value={formData.soDienThoai}
                onChange={(e) =>
                  setFormData({ ...formData, soDienThoai: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                placeholder="0912345678"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-600 mb-1">Ngày đặt:</label>
              <input
                type="date"
                required
                value={formData.ngay}
                onChange={(e) =>
                  setFormData({ ...formData, ngay: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-600 mb-1">Giờ đến:</label>
              <input
                type="time"
                required
                value={formData.gio.slice(0, 5)}
                onChange={(e) =>
                  setFormData({ ...formData, gio: `${e.target.value}:00` })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-600 mb-1">Số khách:</label>
              <input
                type="number"
                min="1"
                required
                value={formData.soKhach}
                onChange={(e) =>
                  setFormData({ ...formData, soKhach: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>
          <div>
            <label className="block font-600 mb-1">Ghi chú:</label>
            <textarea
              rows="2"
              value={formData.ghiChu}
              onChange={(e) =>
                setFormData({ ...formData, ghiChu: e.target.value })
              }
              className="w-full border rounded-lg p-2"
              placeholder="Yêu cầu chỗ ngồi..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-600 border cursor-pointer hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg text-xs font-700 text-white cursor-pointer shadow-sm"
            style={{ background: "var(--primary)" }}
          >
            Tạo đặt lịch
          </button>
        </div>
      </form>
    </div>
  );
}
