export default function Card({ children, style }) {
  return <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: 10, boxShadow: "0 1px 3px rgba(44,26,14,0.05)", ...style }}>{children}</div>;
}
