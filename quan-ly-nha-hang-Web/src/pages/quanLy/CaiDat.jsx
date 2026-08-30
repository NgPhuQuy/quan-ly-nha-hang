import { Building2, Bell, Globe } from "lucide-react";
function Settings() {
  return (
    <div className="p-5 flex flex-col gap-4 max-w-3xl">
      <div>
        <h2
          className="text-base font-700"
          style={{
            color: "var(--foreground)",
          }}
        >
          Cài đặt
        </h2>
        <p
          className="text-xs mt-0.5"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          Quản lý tùy chọn hệ thống
        </p>
      </div>
      {[
        {
          icon: Building2,
          title: "Thông tin chi nhánh",
          fields: [
            {
              label: "Tên chi nhánh",
              value: "Nhà Hàng Vị Việt – Quận 1",
            },
            {
              label: "Địa chỉ",
              value: "45 Lê Lợi, Bến Nghé, Q.1, TP.HCM",
            },
            {
              label: "Số điện thoại",
              value: "028 1234 5678",
            },
          ],
        },
        {
          icon: Bell,
          title: "Thông báo",
          fields: [
            {
              label: "Email thông báo",
              value: "manager.q1@viviet.vn",
            },
          ],
        },
        {
          icon: Globe,
          title: "Ngôn ngữ & Múi giờ",
          fields: [
            {
              label: "Ngôn ngữ",
              value: "Tiếng Việt",
            },
            {
              label: "Múi giờ",
              value: "Asia/Ho_Chi_Minh (GMT+7)",
            },
          ],
        },
      ].map(({ icon: Icon, title, fields }) => (
        <div
          className="bg-white rounded-xl border p-5"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--primary-light)",
              }}
            >
              <Icon
                size={15}
                style={{
                  color: "var(--primary)",
                }}
              />
            </div>
            <span
              className="text-sm font-600"
              style={{
                color: "var(--foreground)",
              }}
            >
              {title}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {fields.map((f) => (
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
                  defaultValue={f.value}
                  className="w-full text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 bg-white"
                  style={{
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-1.5 rounded-lg text-sm font-600 hover:opacity-90"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export { Settings as default };
