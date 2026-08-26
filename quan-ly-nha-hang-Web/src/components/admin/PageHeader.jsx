export default function PageHeader({ title, subtitle, action }) {
  return <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}><div><h1 style={{ fontSize: 22, fontWeight: 700, color: "#2c1a0e", margin: 0, lineHeight: 1.2 }}>{title}</h1>{subtitle && <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#7a6248" }}>{subtitle}</p>}</div>{action && <div>{action}</div>}</div>;
}
