export default function EmptyState({ message = "Không có dữ liệu" }) {
  return <div style={{ textAlign: "center", padding: "48px 24px", color: "#7a6248" }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9dcd0" strokeWidth="1.2" style={{ margin: "0 auto 12px", display: "block" }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><p style={{ margin: 0, fontSize: 14 }}>{message}</p></div>;
}
