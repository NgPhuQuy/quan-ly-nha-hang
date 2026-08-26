export default function Input({ value, onChange, placeholder, type = "text", icon }) {
  return <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
    {icon && <span style={{ position: "absolute", left: 10, color: "#7a6248", display: "flex", pointerEvents: "none" }}>{icon}</span>}
    <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} style={{ height: 36, paddingLeft: icon ? 34 : 12, paddingRight: 12, borderRadius: 8, border: "1px solid #e5ddd0", background: "#fff", color: "#2c1a0e", fontSize: 13.5, fontFamily: "inherit", outline: "none", width: "100%", transition: "border-color 0.12s" }} onFocus={(event) => (event.target.style.borderColor = "#c9922a")} onBlur={(event) => (event.target.style.borderColor = "#e5ddd0")} />
  </div>;
}
