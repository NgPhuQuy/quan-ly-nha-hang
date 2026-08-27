import { useState } from "react";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { mockTransactions, formatCurrency } from "../../data/posMock";
const MONTHS = ["Th\xE1ng 1/2025", "Th\xE1ng 12/2024", "Th\xE1ng 11/2024"];
export default function ThuChi() {
  const [tab, setTab] = useState("T\u1EA5t c\u1EA3");
  const [month, setMonth] = useState("Th\xE1ng 1/2025");
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "Thu",
    category: "",
    description: "",
    amount: "",
    note: "",
  });
  const filtered = transactions.filter(
    (t) => tab === "T\u1EA5t c\u1EA3" || t.type === tab,
  );
  const totalIncome = transactions
    .filter((t) => t.type === "Thu")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Chi")
    .reduce((s, t) => s + t.amount, 0);
  const diff = totalIncome - totalExpense;
  const handleAdd = () => {
    if (!form.description || !form.amount) return;
    const newT = {
      id: `TC-${String(transactions.length + 1).padStart(3, "0")}`,
      date: /* @__PURE__ */ new Date().toISOString().slice(0, 10),
      type: form.type,
      category: form.category || "Kh\xE1c",
      description: form.description,
      amount: parseFloat(form.amount),
      note: form.note,
    };
    setTransactions((prev) => [newT, ...prev]);
    setForm({
      type: "Thu",
      category: "",
      description: "",
      amount: "",
      note: "",
    });
    setShowModal(false);
  };
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{ color: "var(--foreground)" }}
          >
            Thu chi
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            Quản lý thu chi chi nhánh
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)", color: "white" }}
        >
          <Plus size={15} />
          Thêm giao dịch
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "T\u1ED5ng thu",
            value: totalIncome,
            icon: TrendingUp,
            color: "#059669",
          },
          {
            label: "T\u1ED5ng chi",
            value: totalExpense,
            icon: TrendingDown,
            color: "#DC2626",
          },
          {
            label: "Ch\xEAnh l\u1EC7ch",
            value: diff,
            icon: diff >= 0 ? TrendingUp : TrendingDown,
            color: diff >= 0 ? "#059669" : "#DC2626",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border p-4 flex items-center gap-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {label}
              </div>
              <div className="text-base font-700" style={{ color }}>
                {formatCurrency(value)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="flex items-center justify-between px-4 pt-3 pb-0 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex gap-0">
            {["T\u1EA5t c\u1EA3", "Thu", "Chi"].map((t) => (
              <button
                key={t}
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
            style={{ borderColor: "var(--border)" }}
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {[
                "Th\u1EDDi gian",
                "Lo\u1EA1i",
                "N\u1ED9i dung",
                "S\u1ED1 ti\u1EC1n",
                "Ghi ch\xFA",
                "Thao t\xE1c",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <td
                  className="px-4 py-3 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
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
                    style={{ color: "var(--foreground)" }}
                  >
                    {t.description}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.category}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-sm font-600"
                  style={{ color: t.type === "Thu" ? "#16A34A" : "#DC2626" }}
                >
                  {t.type === "Thu" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {t.note || "\u2014"}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="text-xs hover:underline"
                    style={{ color: "#DC2626" }}
                    onClick={() =>
                      setTransactions((prev) =>
                        prev.filter((x) => x.id !== t.id),
                      )
                    }
                  >
                    Xóa
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
              style={{ color: "var(--foreground)" }}
            >
              Thêm giao dịch
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {["Thu", "Chi"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setForm((f) => ({ ...f, type }))}
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
                  label: "N\u1ED9i dung *",
                  key: "description",
                  placeholder: "M\xF4 t\u1EA3 giao d\u1ECBch",
                },
                {
                  label: "Danh m\u1EE5c",
                  key: "category",
                  placeholder:
                    "Nguy\xEAn v\u1EADt li\u1EC7u, Nh\xE2n s\u1EF1...",
                },
                {
                  label: "S\u1ED1 ti\u1EC1n (VND) *",
                  key: "amount",
                  placeholder: "500000",
                  type: "number",
                },
                {
                  label: "Ghi ch\xFA",
                  key: "note",
                  placeholder: "Tu\u1EF3 ch\u1ECDn",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    className="block text-xs font-500 mb-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    className="w-full text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    style={{ borderColor: "var(--border)" }}
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
                style={{ background: "var(--primary)", color: "white" }}
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
