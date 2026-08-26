import { useState } from "react";
const badgeStyles = {
  active: { bg: "#dcfce7", color: "#15803d", label: "Ho\u1EA1t \u0111\u1ED9ng" },
  inactive: { bg: "#f1f5f9", color: "#64748b", label: "T\u1EA1m d\u1EEBng" },
  paid: { bg: "#dcfce7", color: "#15803d", label: "\u0110\xE3 thanh to\xE1n" },
  pending: { bg: "#fef9c3", color: "#92400e", label: "Ch\u1EDD x\u1EED l\xFD" },
  cancelled: { bg: "#fee2e2", color: "#b91c1c", label: "\u0110\xE3 h\u1EE7y" },
  confirmed: { bg: "#dbeafe", color: "#1d4ed8", label: "\u0110\xE3 x\xE1c nh\u1EADn" },
  available: { bg: "#dcfce7", color: "#15803d", label: "Tr\u1ED1ng" },
  occupied: { bg: "#fee2e2", color: "#b91c1c", label: "\u0110ang d\xF9ng" },
  reserved: { bg: "#fef9c3", color: "#92400e", label: "\u0110\xE3 \u0111\u1EB7t" },
  upcoming: { bg: "#dbeafe", color: "#1d4ed8", label: "S\u1EAFp di\u1EC5n ra" },
  expired: { bg: "#f1f5f9", color: "#64748b", label: "H\u1EBFt h\u1EA1n" },
  thu: { bg: "#dcfce7", color: "#15803d", label: "Thu" },
  chi: { bg: "#fee2e2", color: "#b91c1c", label: "Chi" }
};
export function Badge({ status }) {
  const s = badgeStyles[status] ?? { bg: "#f1f5f9", color: "#64748b", label: status };
  return <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 9px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      whiteSpace: "nowrap"
    }}
  >
      {s.label}
    </span>;
}
const btnStyles = {
  primary: { background: "#c9922a", color: "#fff", border: "none" },
  secondary: { background: "#f5f0e8", color: "#2c1a0e", border: "1px solid #e5ddd0" },
  ghost: { background: "transparent", color: "#5a4030", border: "1px solid #e5ddd0" },
  danger: { background: "#fee2e2", color: "#b91c1c", border: "none" }
};
export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon
}) {
  const [hovered, setHovered] = useState(false);
  const padding = size === "sm" ? "5px 12px" : "8px 16px";
  const fontSize = size === "sm" ? 12 : 13.5;
  return <button
    onClick={onClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding,
      borderRadius: 8,
      fontFamily: "inherit",
      fontWeight: 600,
      fontSize,
      cursor: "pointer",
      transition: "opacity 0.12s, box-shadow 0.12s",
      opacity: hovered ? 0.88 : 1,
      ...btnStyles[variant]
    }}
  >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </button>;
}
export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  icon
}) {
  return <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {icon && <span style={{ position: "absolute", left: 10, color: "#7a6248", display: "flex", pointerEvents: "none" }}>
          {icon}
        </span>}
      <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      height: 36,
      paddingLeft: icon ? 34 : 12,
      paddingRight: 12,
      borderRadius: 8,
      border: "1px solid #e5ddd0",
      background: "#fff",
      color: "#2c1a0e",
      fontSize: 13.5,
      fontFamily: "inherit",
      outline: "none",
      width: "100%",
      transition: "border-color 0.12s"
    }}
    onFocus={(e) => e.target.style.borderColor = "#c9922a"}
    onBlur={(e) => e.target.style.borderColor = "#e5ddd0"}
  />
    </div>;
}
export function Select({
  value,
  onChange,
  options
}) {
  return <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      height: 36,
      paddingLeft: 10,
      paddingRight: 28,
      borderRadius: 8,
      border: "1px solid #e5ddd0",
      background: "#fff",
      color: "#2c1a0e",
      fontSize: 13.5,
      fontFamily: "inherit",
      outline: "none",
      cursor: "pointer",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a6248' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 8px center"
    }}
  >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>;
}
export function Card({ children, style }) {
  return <div
    style={{
      background: "#fff",
      border: "1px solid #e5ddd0",
      borderRadius: 10,
      boxShadow: "0 1px 3px rgba(44,26,14,0.05)",
      ...style
    }}
  >
      {children}
    </div>;
}
export function Table({
  headers,
  children
}) {
  return <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => <th
    key={h}
    style={{
      padding: "10px 16px",
      textAlign: "left",
      fontSize: 12,
      fontWeight: 600,
      color: "#7a6248",
      borderBottom: "1px solid #e5ddd0",
      whiteSpace: "nowrap",
      letterSpacing: "0.03em",
      textTransform: "uppercase",
      background: "#fafaf8"
    }}
  >
                {h}
              </th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>;
}
export function Tr({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return <tr
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={onClick}
    style={{
      background: hovered ? "#fffdf8" : "#fff",
      cursor: onClick ? "pointer" : "default",
      transition: "background 0.1s"
    }}
  >
      {children}
    </tr>;
}
export function Td({ children, mono }) {
  return <td
    style={{
      padding: "11px 16px",
      fontSize: 13.5,
      color: "#2c1a0e",
      borderBottom: "1px solid #f0ece3",
      fontFamily: mono ? "'DM Mono', monospace" : "inherit",
      verticalAlign: "middle"
    }}
  >
      {children}
    </td>;
}
export function PageHeader({
  title,
  subtitle,
  action
}) {
  return <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#2c1a0e", margin: 0, lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#7a6248" }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>;
}
export function Modal({
  open,
  onClose,
  title,
  children
}) {
  if (!open) return null;
  return <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(44,26,14,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3,
      padding: 24
    }}
  >
      <div
    onClick={(e) => e.stopPropagation()}
    style={{
      background: "#fff",
      borderRadius: 12,
      width: "100%",
      maxWidth: 480,
      boxShadow: "0 8px 32px rgba(44,26,14,0.15)",
      overflow: "hidden"
    }}
  >
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0ece3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#2c1a0e" }}>{title}</h2>
          <button
    onClick={onClose}
    style={{ background: "none", border: "none", cursor: "pointer", color: "#7a6248", fontSize: 20, lineHeight: 1, padding: 4 }}
  >
            ×
          </button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>;
}
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message
}) {
  return <Modal open={open} onClose={onClose} title="Xác nhận">
      <p style={{ margin: "0 0 20px", color: "#5a4030", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button variant="ghost" onClick={onClose}>Hủy</Button>
        <Button variant="danger" onClick={() => {
    onConfirm();
    onClose();
  }}>Xác nhận xóa</Button>
      </div>
    </Modal>;
}
export function Pagination({
  page,
  total,
  pageSize,
  onChange
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", padding: "12px 16px" }}>
      <span style={{ fontSize: 12.5, color: "#7a6248", marginRight: 4 }}>
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} / {total}
      </span>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button
    key={p}
    onClick={() => onChange(p)}
    style={{
      width: 30,
      height: 30,
      borderRadius: 6,
      border: p === page ? "none" : "1px solid #e5ddd0",
      background: p === page ? "#c9922a" : "#fff",
      color: p === page ? "#fff" : "#5a4030",
      fontWeight: p === page ? 700 : 400,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }}
  >
          {p}
        </button>)}
    </div>;
}
export function EmptyState({ message = "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u" }) {
  return <div style={{ textAlign: "center", padding: "48px 24px", color: "#7a6248" }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9dcd0" strokeWidth="1.2" style={{ margin: "0 auto 12px", display: "block" }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
    </div>;
}
