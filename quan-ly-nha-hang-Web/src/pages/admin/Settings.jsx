import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import Card from "../../components/admin/Card";
import Input from "../../components/admin/Input";
import Button from "../../components/admin/Button";

export default function Settings() {
  const [systemName, setSystemName] = useState("Restaurant Chain Admin");
  const [email, setEmail] = useState("admin@restaurant.vn");
  const [currency, setCurrency] = useState("VND");
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  return (
    <div style={{ padding: "28px 32px", maxWidth: 680 }}>
      <PageHeader
        title="Cài đặt hệ thống"
        subtitle="Cấu hình chung cho toàn bộ ứng dụng"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Card style={{ padding: "22px 24px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 18,
            }}
          >
            Thông tin hệ thống
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Tên hệ thống
              </label>
              <Input
                value={systemName}
                onChange={setSystemName}
                placeholder="Tên ứng dụng"
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email quản trị
              </label>
              <Input
                value={email}
                onChange={setEmail}
                placeholder="admin@example.com"
                type="email"
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Đơn vị tiền tệ
              </label>
              <Input
                value={currency}
                onChange={setCurrency}
                placeholder="VND"
              />
            </div>
          </div>
        </Card>

        <Card style={{ padding: "22px 24px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 18,
            }}
          >
            Thông tin Admin
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "12px 16px",
              background: "#fafaf8",
              borderRadius: 10,
              border: "1px solid #f0ece3",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#c9922a,#e8a83a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#2c1a0e" }}>
                Admin Hệ thống
              </div>
              <div style={{ fontSize: 12.5, color: "#7a6248" }}>
                admin@restaurant.vn · Quản trị viên
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <Button variant="ghost">Đổi mật khẩu</Button>
            <Button variant="secondary">Cập nhật hồ sơ</Button>
          </div>
        </Card>

        <Card style={{ padding: "22px 24px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 4,
            }}
          >
            Phiên bản
          </div>
          <p style={{ fontSize: 13, color: "#7a6248", margin: "0 0 16px" }}>
            Thông tin phiên bản ứng dụng
          </p>
          {[
            ["Phi\xEAn b\u1EA3n", "1.0.0"],
            ["M\xF4i tr\u01B0\u1EDDng", "Production"],
            ["C\u01A1 s\u1EDF d\u1EEF li\u1EC7u", "PostgreSQL 15"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #f0ece3",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#7a6248" }}>{label}</span>
              <span
                style={{
                  fontWeight: 600,
                  color: "#2c1a0e",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          {saved && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#15803d",
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Đã lưu thay đổi
            </div>
          )}
          <Button variant="ghost">Hủy bỏ</Button>
          <Button onClick={handleSave}>Lưu cài đặt</Button>
        </div>
      </div>
    </div>
  );
}
