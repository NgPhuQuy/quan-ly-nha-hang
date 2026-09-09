import { useState, useEffect } from "react";
import { Plus, TrendingUp, TrendingDown, Trash2 } from "lucide-react";
// Chức năng Thu Chi đang được bảo trì / nâng cấp
const layDanhSachThuChi = async () => [];
const taoThuChi = async (data) => ({ maGiaoDich: Date.now(), ...data });
const xoaThuChi = async () => true;
import {
  dinhDangTien,
  taoDanhSachThangGanNhat,
  layThangHienTai,
} from "../../utils/dinhDang";
const MONTHS = taoDanhSachThangGanNhat(6);
function IncomeExpense() {
  const [tab, setTab] = useState("Tất cả");
  const [month, setMonth] = useState(layThangHienTai());
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "Thu",
    category: "",
    description: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
    layDanhSachThuChi().then((data) => {
      if (data && data.length > 0) {
        setTransactions(data);
      }
    });
  }, []);

  const filtered = transactions.filter(
    (t) => tab === "Tất cả" || t.type === tab,
  );
  const totalIncome = transactions
    .filter((t) => t.type === "Thu")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Chi")
    .reduce((s, t) => s + t.amount, 0);
  const diff = totalIncome - totalExpense;

  const handleAdd = async () => {
    if (!form.description || !form.amount) return;
    try {
      const created = await taoThuChi({
        loai: form.type,
        danhMuc: form.category || "Khác",
        moTa: form.description,
        soTien: parseFloat(form.amount),
        ghiChu: form.note,
        maChiNhanh: 1,
      });
      if (created) {
        setTransactions((prev) => [
          {
            id: created.maGiaoDichCode || `TC-${created.maGiaoDich}`,
            maGiaoDichId: created.maGiaoDich,
            date: created.ngayGiaoDich
              ? String(created.ngayGiaoDich).slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            type: created.loai || form.type,
            category: created.danhMuc || form.category || "Khác",
            description: created.moTa || form.description,
            amount: Number(created.soTien || form.amount),
            note: created.ghiChu || form.note,
          },
          ...prev,
        ]);
      }
    } catch (e) {
      console.warn("Create transaction API failed, adding locally", e);
      const newT = {
        id: `TC-${String(transactions.length + 1).padStart(3, "0")}`,
        date: new Date().toISOString().slice(0, 10),
        type: form.type,
        category: form.category || "Khác",
        description: form.description,
        amount: parseFloat(form.amount),
        note: form.note,
      };
      setTransactions((prev) => [newT, ...prev]);
    }
    setForm({
      type: "Thu",
      category: "",
      description: "",
      amount: "",
      note: "",
    });
    setShowModal(false);
  };

  const handleDelete = async (t) => {
    if (t.maGiaoDichId) {
      try {
        await xoaThuChi(t.maGiaoDichId);
      } catch (e) {
        console.warn("Delete transaction API failed:", e);
      }
    }
    setTransactions((prev) => prev.filter((x) => x.id !== t.id));
  };
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Thu chi
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Quản lý thu chi chi nhánh
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 transition-opacity hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={15} />
          Thêm giao dịch
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Tổng thu",
            value: totalIncome,
            icon: TrendingUp,
            color: "#059669",
          },
          {
            label: "Tổng chi",
            value: totalExpense,
            icon: TrendingDown,
            color: "#DC2626",
          },
          {
            label: "Chênh lệch",
            value: diff,
            icon: diff >= 0 ? TrendingUp : TrendingDown,
            color: diff >= 0 ? "#059669" : "#DC2626",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            className="bg-white rounded-xl border p-4 flex items-center gap-3"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${color}18`,
              }}
            >
              <Icon
                size={17}
                style={{
                  color,
                }}
              />
            </div>
            <div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {label}
              </div>
              <div
                className="text-base font-700"
                style={{
                  color,
                }}
              >
                {dinhDangTien(value)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div
          className="flex items-center justify-between px-4 pt-3 pb-0 border-b"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex gap-0">
            {["Tất cả", "Thu", "Chi"].map((t) => (
              <button
                onClick={() => setTab(t)}
                className="px-4 py-2.5 text-sm font-500 border-b-2 -mb-px transition-colors"
                style={{
                  borderColor: tab === t ? "var(--primary)" : "transparent",
                  color:
                    tab === t ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="text-xs border rounded-lg px-2 py-1 outline-none bg-white mb-2"
            style={{
              borderColor: "var(--border)",
            }}
          >
            {MONTHS.map((m) => (
              <option>{m}</option>
            ))}
          </select>
        </div>
        <table className="w-full text-sm">
          <thead
            style={{
              background: "var(--secondary)",
            }}
          >
            <tr>
              {[
                "Thời gian",
                "Loại",
                "Nội dung",
                "Số tiền",
                "Ghi chú",
                "Thao tác",
              ].map((h) => (
                <th
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
            {filtered.map((t) => (
              <tr
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {t.date}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background: t.type === "Thu" ? "#F0FDF4" : "#FEF2F2",
                      color: t.type === "Thu" ? "#16A34A" : "#DC2626",
                    }}
                  >
                    {t.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="text-xs font-500"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {t.description}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {t.category}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-sm font-600"
                  style={{
                    color: t.type === "Thu" ? "#16A34A" : "#DC2626",
                  }}
                >
                  {t.type === "Thu" ? "+" : "-"}
                  {dinhDangTien(t.amount)}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {t.note || "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Xóa giao dịch"
                    onClick={() => handleDelete(t)}
                  >
                    <Trash2 size={16} strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3
              className="text-base font-700 mb-4"
              style={{
                color: "var(--foreground)",
              }}
            >
              Thêm giao dịch
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {["Thu", "Chi"].map((type) => (
                  <button
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        type,
                      }))
                    }
                    className="flex-1 py-2 rounded-lg text-sm font-500 border transition-colors"
                    style={{
                      background:
                        form.type === type ? "var(--primary)" : "white",
                      color: form.type === type ? "white" : "var(--foreground)",
                      borderColor:
                        form.type === type ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {[
                {
                  label: "Nội dung *",
                  key: "description",
                  placeholder: "Mô tả giao dịch",
                },
                {
                  label: "Danh mục",
                  key: "category",
                  placeholder: "Nguyên vật liệu, Nhân sự...",
                },
                {
                  label: "Số tiền (VND) *",
                  key: "amount",
                  placeholder: "500000",
                  type: "number",
                },
                {
                  label: "Ghi chú",
                  key: "note",
                  placeholder: "Tuỳ chọn",
                },
              ].map((f) => (
                <div>
                  <label
                    className="block text-xs font-500 mb-1"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    className="w-full text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg text-sm font-500 border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 rounded-lg text-sm font-600 hover:opacity-90"
                style={{
                  background: "var(--primary)",
                  color: "white",
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export { IncomeExpense as default };
