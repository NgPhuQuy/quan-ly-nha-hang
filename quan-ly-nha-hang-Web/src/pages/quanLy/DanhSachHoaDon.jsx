import { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { layDanhSachHoaDon } from "../../services/hoaDon.service";
import { dinhDangTien, dinhDangNgayGio } from "../../utils/dinhDang";

const mauTrangThaiHoaDon = {
  HOAN_THANH: {
    bg: "var(--success-bg)",
    text: "var(--success)",
    label: "Hoàn thành",
  },
  DANG_PHUC_VU: {
    bg: "#FFFBEB",
    text: "#D97706",
    label: "Đang phục vụ",
  },
  CHO_XU_LY: {
    bg: "var(--warning-bg)",
    text: "var(--warning)",
    label: "Chờ xử lý",
  },
  DANG_XU_LY: {
    bg: "#EFF6FF",
    text: "#2563EB",
    label: "Đang xử lý",
  },
  DA_HUY: {
    bg: "var(--danger-bg)",
    text: "var(--danger)",
    label: "Đã hủy",
  },
};

const PAGE_SIZE = 10;

function DanhSachHoaDon({
  chi_nhanh = [],
  onNavigate,
  onSelectInvoice,
  selectedBranchId,
  onSelectBranch,
  isPos,
}) {
  const [danh_sach_hoa_don, setdanh_sach_hoa_don] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState(() =>
    isPos && selectedBranchId ? String(selectedBranchId) : "",
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isPos && selectedBranchId) {
      setBranchFilter(String(selectedBranchId));
    }
  }, [isPos, selectedBranchId]);

  useEffect(() => {
    layDanhSachHoaDon()
      .then((data) => {
        setdanh_sach_hoa_don(
          Array.isArray(data) ? [...data].sort((a, b) => b.maHoaDon - a.maHoaDon) : [],
        );
      })
      .catch(() => {
        setdanh_sach_hoa_don([]);
      });
  }, []);

  const filtered = danh_sach_hoa_don.filter((inv) => {
    if (search && !String(inv.maHoaDon).includes(search.toLowerCase()))
      return false;
    if (statusFilter && inv.trangThai !== statusFilter) return false;
    if (branchFilter && String(inv.maChiNhanh) !== String(branchFilter))
      return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectStyle =
    "text-sm border rounded-lg px-3 py-1.5 outline-none bg-white text-stone-800 focus:border-amber-500 font-medium";
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Hóa đơn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {filtered.length} hóa đơn
          </p>
        </div>
        <button
          onClick={() => onNavigate("tao_hoa_don")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90 cursor-pointer shadow-sm"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Tạo hóa đơn
        </button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Tìm mã hóa đơn..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-48 outline-none bg-white text-stone-800 placeholder:text-stone-400 focus:border-amber-500 font-medium"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>
        <select
          value={branchFilter}
          onChange={(e) => {
            const val = e.target.value;
            setBranchFilter(val);
            setPage(1);
            if (val) onSelectBranch?.(val);
          }}
          className={selectStyle}
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả chi nhánh</option>
          {chi_nhanh.map((b) => (
            <option key={b.maChiNhanh} value={b.maChiNhanh}>
              {b.tenChiNhanh}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={selectStyle}
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="DANG_PHUC_VU">Đang phục vụ</option>
          <option value="HOAN_THANH">Hoàn thành</option>
          <option value="CHO_XU_LY">Chờ xử lý</option>
          <option value="DA_HUY">Đã hủy</option>
        </select>
      </div>
      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <table className="w-full text-sm">
          <thead
            style={{
              background: "var(--secondary)",
            }}
          >
            <tr>
              {[
                "Mã hóa đơn",
                "Thời gian",
                "Chi nhánh",
                "Bàn",
                "Số món",
                "Tổng tiền",
                "Trạng thái",
                "Thao tác",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  Không tìm thấy hóa đơn
                </td>
              </tr>
            )}
            {paged.map((inv) => {
              const sColor =
                mauTrangThaiHoaDon[inv.trangThai] ||
                mauTrangThaiHoaDon.CHO_XU_LY;
              const tenCn =
                chi_nhanh.find((b) => b.maChiNhanh === inv.maChiNhanh)
                  ?.tenChiNhanh || `Chi nhánh #${inv.maChiNhanh}`;
              return (
                <tr
                  key={inv.maHoaDon}
                  className="border-t hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--border)",
                  }}
                  onClick={() => {
                    onSelectInvoice(inv.maHoaDon);
                    onNavigate("chi_tiet_hoa_don");
                  }}
                >
                  <td
                    className="px-4 py-3 font-600 text-xs"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    #{inv.maHoaDon}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {dinhDangNgayGio(inv.ngayLapHoaDon)}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {tenCn}
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-semibold"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {inv.maBan ? `Bàn #${inv.maBan}` : "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-medium"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {inv.listChiTietHoaDon?.length || 0} món
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-700"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {dinhDangTien(inv.tongTien || 0)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-500"
                      style={{
                        background: sColor.bg,
                        color: sColor.text,
                      }}
                    >
                      {sColor.label || inv.trangThai}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="text-xs font-500 hover:underline cursor-pointer"
                      style={{
                        color: "var(--primary)",
                      }}
                      onClick={() => {
                        onSelectInvoice(inv.maHoaDon);
                        onNavigate("chi_tiet_hoa_don");
                      }}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <span
              className="text-xs"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              Trang {page} / {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export { DanhSachHoaDon as default };
