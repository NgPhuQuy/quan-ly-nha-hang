# 5S Restaurant API Specification

> Tài liệu định hướng API cho Frontend React của hệ thống quản lý nhà hàng 5S.
>
> Base URL đề xuất: `/api/v1`
>
> **Lưu ý:** Đây là API contract ở mức thiết kế. Khi triển khai Backend/Swagger cần bổ sung chi tiết `request body`, `response`, `status code`, validation và permission cụ thể.

---

## 1. Quy ước chung

### Authentication

Các API quản trị yêu cầu Bearer Token:

```http
Authorization: Bearer <access_token>
```

Frontend sử dụng cơ chế axios hiện tại trong:

```text
services/apis.js
```

Gồm:

- `apis`: request không cần authentication.
- `authApis()`: request có Bearer Token.

### Phân quyền

Không tách API thành `/admin/*` và `/pos/*`.

Cùng một resource được dùng chung cho toàn hệ thống. Backend quyết định quyền dựa trên:

```text
role + permission + branch scope
```

Ví dụ:

```text
Manager chi nhánh 1
GET /foods
→ chỉ nhận dữ liệu trong phạm vi chi nhánh 1

Admin
GET /foods
→ có thể xem toàn hệ thống

Admin
GET /foods?branchId=3
→ xem riêng chi nhánh 3
```

---

# 2. Auth

```text
Auth
├── POST /auth/login
│   └── Đăng nhập, trả access token + thông tin tài khoản/role/chi nhánh
│
├── POST /auth/logout
│   └── Đăng xuất / vô hiệu hóa phiên hiện tại
│
├── GET /auth/me
│   └── Lấy thông tin tài khoản đang đăng nhập
│
└── POST /auth/refresh
    └── Làm mới access token nếu hệ thống sử dụng refresh token
```

---

# 3. Người dùng

```text
NguoiDung
├── GET /users
│   └── Danh sách tài khoản
│       Query: role, branchId, status, keyword, page, limit
│
├── GET /users/{id}
│   └── Chi tiết tài khoản
│
├── POST /users
│   └── Tạo tài khoản nhân viên / quản lý
│
├── PUT /users/{id}
│   └── Cập nhật thông tin tài khoản
│
├── PATCH /users/{id}/status
│   └── Kích hoạt / vô hiệu hóa tài khoản
│
└── DELETE /users/{id}
    └── Xóa tài khoản nếu nghiệp vụ cho phép
```

---

# 4. Chi nhánh

```text
ChiNhanh
├── GET /branches
│   └── Danh sách chi nhánh
│       Query: status, keyword, page, limit
│
├── GET /branches/{id}
│   └── Chi tiết chi nhánh
│
├── POST /branches
│   └── Tạo chi nhánh
│
├── PUT /branches/{id}
│   └── Cập nhật thông tin chi nhánh
│
├── PATCH /branches/{id}/status
│   └── Hoạt động / tạm đóng
│
└── DELETE /branches/{id}
    └── Xóa chi nhánh
```

---

# 5. Khách hàng

```text
KhachHang
├── GET /customers
│   └── Danh sách khách hàng
│       Query: keyword, page, limit
│
├── GET /customers/{id}
│   └── Chi tiết khách hàng
│
├── GET /customers/{id}/invoices
│   └── Lịch sử hóa đơn của khách hàng
│
└── GET /customers/{id}/bookings
    └── Lịch sử đặt bàn của khách hàng
```

---

# 6. Danh mục món

```text
DanhMucMon
├── GET /categories
│   └── Danh sách danh mục món
│
├── GET /categories/{id}
│   └── Chi tiết danh mục
│
├── POST /categories
│   └── Tạo danh mục
│
├── PUT /categories/{id}
│   └── Cập nhật danh mục
│
├── PATCH /categories/{id}/status
│   └── Ẩn / hiện danh mục
│
└── DELETE /categories/{id}
    └── Xóa danh mục
```

---

# 7. Món ăn

```text
MonAn
├── GET /foods
│   └── Danh sách món ăn
│       Query: categoryId, branchId, status, keyword, page, limit
│
├── GET /foods/{id}
│   └── Chi tiết món ăn
│
├── POST /foods
│   └── Tạo món ăn
│
├── PUT /foods/{id}
│   └── Cập nhật món ăn
│
├── PATCH /foods/{id}/status
│   └── Cập nhật trạng thái món:
│       đang bán / hết món / tạm ngưng
│
└── DELETE /foods/{id}
    └── Xóa món ăn
```

---

# 8. Bàn

```text
BanAn
├── GET /tables
│   └── Danh sách bàn
│       Query: branchId, status
│
├── GET /tables/{id}
│   └── Chi tiết bàn
│
├── POST /tables
│   └── Tạo bàn
│
├── PUT /tables/{id}
│   └── Cập nhật bàn
│
├── PATCH /tables/{id}/status
│   └── Cập nhật trạng thái bàn
│
└── DELETE /tables/{id}
    └── Xóa bàn
```

---

# 9. Đặt bàn

```text
DatBan
├── GET /bookings
│   └── Danh sách đặt bàn
│       Query:
│       branchId
│       status
│       date
│       keyword
│       page
│       limit
│
├── GET /bookings/{id}
│   └── Chi tiết lịch đặt
│
├── POST /bookings
│   └── Tạo lịch đặt bàn
│
├── PUT /bookings/{id}
│   └── Cập nhật lịch đặt
│
├── PATCH /bookings/{id}/status
│   └── Xác nhận / chờ xác nhận / hủy
│
└── DELETE /bookings/{id}
    └── Xóa lịch đặt nếu nghiệp vụ cho phép
```

---

# 10. Hóa đơn

Đây là resource quan trọng nhất của POS.

Flow chính:

```text
Bàn
 ↓
Tạo hóa đơn
 ↓
Thêm món
 ↓
Thay đổi số lượng
 ↓
Tính tổng
 ↓
Thanh toán
 ↓
Hoàn thành
 ↓
Bàn trở lại trạng thái trống
```

API:

```text
HoaDon
├── GET /invoices
│   └── Danh sách hóa đơn
│       Query:
│       branchId
│       source
│       status
│       fromDate
│       toDate
│       keyword
│       page
│       limit
│
├── GET /invoices/{id}
│   └── Chi tiết hóa đơn + danh sách món
│
├── POST /invoices
│   └── Tạo hóa đơn từ order/cart
│
├── PUT /invoices/{id}
│   └── Cập nhật hóa đơn khi chưa thanh toán
│
├── POST /invoices/{id}/items
│   └── Thêm món vào hóa đơn
│
├── PATCH /invoices/{id}/items/{itemId}
│   └── Cập nhật số lượng món
│
├── DELETE /invoices/{id}/items/{itemId}
│   └── Xóa món khỏi hóa đơn
│
├── POST /invoices/{id}/payment
│   └── Thanh toán hóa đơn
│
├── POST /invoices/{id}/cancel
│   └── Hủy hóa đơn
│
└── GET /invoices/{id}/payment
    └── Lấy thông tin thanh toán
```

### Lưu ý nghiệp vụ

Không nên để Frontend tự quyết định độc lập:

```text
invoice.status = "completed"
table.status = "empty"
```

Sau khi thanh toán, Backend nên xử lý transaction để đảm bảo trạng thái hóa đơn và bàn nhất quán.

---

# 11. Thu chi

```text
ThuChi
├── GET /transactions
│   └── Danh sách khoản thu/chi
│       Query:
│       branchId
│       type
│       category
│       fromDate
│       toDate
│       page
│       limit
│
├── GET /transactions/{id}
│   └── Chi tiết khoản thu/chi
│
├── POST /transactions
│   └── Tạo khoản thu/chi
│
├── PUT /transactions/{id}
│   └── Cập nhật khoản thu/chi
│
└── DELETE /transactions/{id}
    └── Xóa khoản thu/chi
```

---

# 12. Khuyến mãi

```text
KhuyenMai
├── GET /promotions
│   └── Danh sách khuyến mãi
│       Query: status, fromDate, toDate, page, limit
│
├── GET /promotions/{id}
│   └── Chi tiết khuyến mãi
│
├── POST /promotions
│   └── Tạo khuyến mãi
│
├── PUT /promotions/{id}
│   └── Cập nhật khuyến mãi
│
├── PATCH /promotions/{id}/status
│   └── Bật / tắt hoặc thay đổi trạng thái
│
└── DELETE /promotions/{id}
    └── Xóa khuyến mãi
```

---

# 13. Dashboard

Dashboard nên có API tổng hợp thay vì Frontend gọi nhiều API rồi tự tính toán.

```text
Dashboard
├── GET /dashboard/overview
│   └── KPI tổng quan:
│       doanh thu
│       hóa đơn
│       khách hàng
│       tổng thu
│       tổng chi
│       lợi nhuận
│
├── GET /dashboard/revenue
│   └── Doanh thu theo thời gian
│
├── GET /dashboard/revenue-source
│   └── Doanh thu theo nguồn:
│       WALK_IN / ONLINE
│
├── GET /dashboard/revenue-branch
│   └── Doanh thu theo chi nhánh
│
├── GET /dashboard/recent-invoices
│   └── Hóa đơn gần đây
│
└── GET /dashboard/expenses
    └── Chi phí theo danh mục
```

---

# 14. Báo cáo

```text
BaoCao
├── GET /reports/revenue
│   └── Báo cáo doanh thu
│       Query: branchId, fromDate, toDate
│
├── GET /reports/invoices
│   └── Báo cáo hóa đơn
│
├── GET /reports/income-expense
│   └── Báo cáo thu chi
│
├── GET /reports/profit
│   └── Báo cáo lợi nhuận
│
└── GET /reports/summary
    └── Tổng hợp báo cáo theo khoảng thời gian
```

---

# 15. Quan hệ API với Frontend

Frontend nên đi theo flow:

```text
pages / components
        │
        ▼
services/
        │
        ▼
services/apis.js
        │
        ▼
Backend REST API
```

Ví dụ:

```text
TrangChiNhanh
    ↓
chiNhanh.service.js
    ↓
GET /api/v1/branches
```

```text
TrangMonAn
    ↓
monAn.service.js
    ↓
GET /api/v1/foods
```

```text
TrangPOS
    ↓
hoaDon.service.js
    ↓
POST /api/v1/invoices
POST /api/v1/invoices/{id}/items
POST /api/v1/invoices/{id}/payment
```

Không gọi axios trực tiếp từ page/component nếu đã có service tương ứng.

---

# 16. Frontend Service Mapping

Định hướng file:

```text
services/
├── apis.js
├── auth.service.js
├── nguoiDung.service.js
├── chiNhanh.service.js
├── khachHang.service.js
├── danhMucMon.service.js
├── monAn.service.js
├── banAn.service.js
├── datBan.service.js
├── hoaDon.service.js
├── thuChi.service.js
├── khuyenMai.service.js
├── dashboard.service.js
└── baoCao.service.js
```

Mỗi service chịu trách nhiệm gọi API của một resource.

Ví dụ:

```js
// services/chiNhanh.service.js

export const layDanhSachChiNhanh = async (thamSo) => {
    // GET /branches
};

export const layChiNhanh = async (id) => {
    // GET /branches/{id}
};

export const taoChiNhanh = async (duLieu) => {
    // POST /branches
};
```

---

# 17. API ưu tiên triển khai

Nếu Backend chưa hoàn thiện toàn bộ API, ưu tiên theo thứ tự:

### Priority 1 — Authentication

```text
POST /auth/login
GET  /auth/me
POST /auth/logout
```

### Priority 2 — POS core

```text
GET  /tables
GET  /foods
GET  /categories

POST /invoices
POST /invoices/{id}/items
PATCH /invoices/{id}/items/{itemId}
DELETE /invoices/{id}/items/{itemId}
POST /invoices/{id}/payment
POST /invoices/{id}/cancel
```

### Priority 3 — Quản lý

```text
GET/POST/PUT/PATCH /branches
GET/POST/PUT/PATCH /foods
GET/POST/PUT/PATCH /categories
GET/POST/PUT/PATCH /tables
GET/POST/PUT/PATCH /bookings
GET/POST/PUT/PATCH /users
```

### Priority 4 — Tài chính

```text
GET/POST/PUT/DELETE /transactions
GET /reports/income-expense
GET /reports/profit
```

### Priority 5 — Dashboard / báo cáo

```text
GET /dashboard/overview
GET /dashboard/revenue
GET /dashboard/revenue-source
GET /dashboard/revenue-branch
GET /dashboard/recent-invoices
GET /dashboard/expenses

GET /reports/revenue
GET /reports/invoices
GET /reports/summary
```

### Priority 6 — Khuyến mãi

```text
GET/POST/PUT/PATCH/DELETE /promotions
```

---

# 18. Những API không nên tự bịa

Nếu Backend chưa có endpoint tương ứng:

- Không tự tạo endpoint chỉ để UI hết mock.
- Kiểm tra các API hiện có trước.
- Nếu API chưa tồn tại nhưng UI cần dữ liệu, tiếp tục dùng mock.
- Mock phải nằm trong `src/data/` để sau này xóa/thay dễ dàng.
- Không hardcode endpoint giả vào service.

Ví dụ không được tự suy đoán:

```text
GET /api/revenue/monthly
GET /api/pos/statistics
GET /api/admin/dashboard
```

nếu Backend chưa định nghĩa các endpoint đó.

---

# 19. Nguyên tắc thiết kế API

1. API tổ chức theo **resource**, không theo giao diện.
2. Không tạo API riêng cho Admin/POS nếu cùng nghiệp vụ.
3. Role + permission + branch scope do Backend kiểm soát.
4. Dashboard nên có API tổng hợp.
5. Các thao tác POS quan trọng phải được Backend đảm bảo transaction.
6. Frontend không tự tính hoặc tự quyết định trạng thái nghiệp vụ quan trọng nếu Backend là nguồn dữ liệu chính.
7. Không duplicate API chỉ vì hai page khác nhau sử dụng.
8. Khi API chưa tồn tại, giữ mock trong `data/` thay vì bịa endpoint.
