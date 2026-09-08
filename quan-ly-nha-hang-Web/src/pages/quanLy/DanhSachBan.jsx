import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Plus,
  Building2,
  X,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import {
  layDanhSachBan,
  doiTrangThaiBan,
  taoBan,
} from "../../services/banAn.service";

const kiemTraTrong = (trangThai) => {
  return trangThai === true || trangThai === 1 || trangThai === "true";
};

function Tables({
  chi_nhanh = [],
  selectedBranchId: propBranchId,
  onSelectBranch,
}) {
  const [tables, setTables] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState(
    () => propBranchId || "",
  );
  const [filter, setFilter] = useState("");
  const [loadingDoiTrangThai, setLoadingDoiTrangThai] = useState(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [formData, setFormData] = useState({
    maChiNhanh: 1,
  });

  useEffect(() => {
    if (propBranchId) {
      setSelectedBranchId(propBranchId);
    } else if (chi_nhanh.length && !selectedBranchId) {
      setSelectedBranchId(chi_nhanh[0].maChiNhanh);
    }
  }, [propBranchId, chi_nhanh, selectedBranchId]);

  const fetchTables = useCallback(async () => {
    try {
      const data = await layDanhSachBan(selectedBranchId || undefined);
      setTables(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Could not fetch tables", err);
      setTables([]);
    }
  }, [selectedBranchId]);

  useEffect(() => {
    if (selectedBranchId) {
      const timeoutId = setTimeout(() => {
        fetchTables();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [selectedBranchId, fetchTables]);

  const handleDoiTrangThaiBan = async (maBan) => {
    setLoadingDoiTrangThai(maBan);
    try {
      const res = await doiTrangThaiBan(maBan);
      setTables((prev) =>
        prev.map((t) =>
          t.maBan === maBan
            ? {
                ...t,
                trangThai:
                  res?.trangThai !== undefined ? res.trangThai : !t.trangThai,
              }
            : t,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Cập nhật trạng thái bàn thất bại!");
    } finally {
      setLoadingDoiTrangThai(null);
    }
  };

  const handleOpenAdd = () => {
    setThongBaoLoi("");
    setFormData({
      maChiNhanh: selectedBranchId || (chi_nhanh[0]?.maChiNhanh ?? 1),
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");
    try {
      await taoBan({
        maChiNhanh: Number(formData.maChiNhanh),
      });
      setShowModal(false);
      fetchTables();
    } catch (err) {
      setThongBaoLoi(err.response?.data?.message || "Lỗi khi tạo bàn!");
    }
  };

  const trongCount = tables.filter((t) => kiemTraTrong(t.trangThai)).length;
  const phucVuCount = tables.filter((t) => !kiemTraTrong(t.trangThai)).length;

  const filtered = tables.filter((t) => {
    if (filter === "TRONG") return kiemTraTrong(t.trangThai);
    if (filter === "DANG_PHUC_VU") return !kiemTraTrong(t.trangThai);
    return true;
  });

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Tiêu đề & Chọn Chi Nhánh / Thêm Bàn */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Sơ đồ bàn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {tables.length} bàn phục vụ
          </p>
        </div>

        {/* Chọn Chi nhánh & Nút thêm bàn */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 size={15} style={{ color: "var(--primary)" }} />
            <select
              value={selectedBranchId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedBranchId(val);
                onSelectBranch?.(val);
              }}
              className="text-xs font-600 border rounded-lg px-2.5 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
              style={{ borderColor: "var(--border)" }}
            >
              {chi_nhanh.map((b) => (
                <option key={b.maChiNhanh} value={b.maChiNhanh}>
                  {b.tenChiNhanh}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-700 text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: "var(--primary)" }}
          >
            <Plus size={14} /> Thêm bàn
          </button>
        </div>
      </div>

      {/* Thống kê trạng thái & Bộ lọc 2 trạng thái */}
      <div
        className="flex items-center justify-between border-y py-2.5 flex-wrap gap-2"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilter("")}
            className="px-3.5 py-1.5 rounded-full text-xs font-600 transition-colors cursor-pointer"
            style={{
              background: !filter ? "var(--primary)" : "var(--secondary)",
              color: !filter ? "white" : "var(--secondary-foreground)",
            }}
          >
            Tất cả ({tables.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("TRONG")}
            className="px-3.5 py-1.5 rounded-full text-xs font-600 transition-colors cursor-pointer"
            style={{
              background:
                filter === "TRONG" ? "var(--primary)" : "var(--secondary)",
              color:
                filter === "TRONG" ? "white" : "var(--secondary-foreground)",
            }}
          >
            Bàn trống ({trongCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("DANG_PHUC_VU")}
            className="px-3.5 py-1.5 rounded-full text-xs font-600 transition-colors cursor-pointer"
            style={{
              background:
                filter === "DANG_PHUC_VU"
                  ? "var(--primary)"
                  : "var(--secondary)",
              color:
                filter === "DANG_PHUC_VU"
                  ? "white"
                  : "var(--secondary-foreground)",
            }}
          >
            Đang phục vụ ({phucVuCount})
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span style={{ color: "var(--foreground)" }}>Bàn trống:</span>
            <span className="font-bold text-emerald-600">{trongCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span style={{ color: "var(--foreground)" }}>Đang phục vụ:</span>
            <span className="font-bold text-rose-600">{phucVuCount}</span>
          </div>
        </div>
      </div>

      {/* Sơ đồ danh sách bàn */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-xs font-medium">
          Không có bàn nào trong chi nhánh hoặc danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((table) => {
            const isTrong = kiemTraTrong(table.trangThai);
            const tenHienThi = table.soBan || `Bàn ${table.maBan}`;

            return (
              <div
                key={table.maBan}
                className={`group relative bg-white rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                  isTrong
                    ? "border-emerald-200 hover:border-emerald-400"
                    : "border-rose-200 hover:border-rose-400 bg-rose-50/10"
                }`}
              >
                {/* Header thẻ: Tên bàn & Trạng thái badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {tenHienThi}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      Mã số: #{table.maBan}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                      isTrong
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isTrong ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    {isTrong ? "Trống" : "Đang phục vụ"}
                  </span>
                </div>

                {/* Biểu tượng trực quan */}
                <div className="my-3.5 py-3 px-3 rounded-xl bg-gray-50 flex items-center justify-center gap-2.5 border border-gray-100">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isTrong
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {isTrong ? <CheckCircle2 size={18} /> : <Users size={18} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-700 truncate">
                      {isTrong ? "Khả dụng" : "Có khách"}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {isTrong ? "Sẵn sàng đón khách" : "Đang phục vụ"}
                    </div>
                  </div>
                </div>

                {/* Nút hành động đổi trạng thái */}
                <button
                  type="button"
                  disabled={loadingDoiTrangThai === table.maBan}
                  onClick={() => handleDoiTrangThaiBan(table.maBan)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isTrong
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                  }`}
                  title="Nhấn để đổi trạng thái bàn"
                >
                  <RefreshCw
                    size={12}
                    className={
                      loadingDoiTrangThai === table.maBan ? "animate-spin" : ""
                    }
                  />
                  {isTrong ? "Đổi: Có khách" : "Đổi: Bàn trống"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Thêm Bàn Mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 text-gray-900">
                Thêm Bàn Ăn Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
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

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-600 mb-1.5 text-gray-700">
                  Chi nhánh thêm bàn:
                </label>
                <select
                  value={formData.maChiNhanh}
                  onChange={(e) =>
                    setFormData({ ...formData, maChiNhanh: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 font-medium outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  {chi_nhanh.map((b) => (
                    <option key={b.maChiNhanh} value={b.maChiNhanh}>
                      {b.tenChiNhanh}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
                Bàn mới sẽ được tạo tự động với trạng thái{" "}
                <strong>Trống</strong> (khả dụng) và sẵn sàng phục vụ tại chi
                nhánh đã chọn.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-600 border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-700 text-white shadow-xs hover:opacity-95 cursor-pointer"
                style={{ background: "var(--primary)" }}
              >
                Tạo bàn
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tables;
