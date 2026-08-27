import Card from "./Card";

export default function KpiCard({ label, value, sub, trend, accent }) {
  return (
    <Card style={{ padding: "18px 20px" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#7a6248",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: accent ? "#c9922a" : "#2c1a0e",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: "#7a6248", marginTop: 4 }}>
          {sub}
        </div>
      )}
      {trend && (
        <div
          style={{
            fontSize: 12,
            color: "#15803d",
            marginTop: 6,
            fontWeight: 600,
          }}
        >
          ↑ {trend} so với tháng trước
        </div>
      )}
    </Card>
  );
}