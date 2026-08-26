export default function Td({ children, mono }) {
  return <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", fontFamily: mono ? "'DM Mono', monospace" : "inherit", verticalAlign: "middle" }}>{children}</td>;
}
