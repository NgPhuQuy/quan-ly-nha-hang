import { useState } from "react";

function MenuSelection({
  menuItems,
  selectedItems,
  setSelectedItems,
  onTiepTuc,
  onQuayLai,
}) {
  const [nhom, setNhom] = useState("Tất cả");

  const kiemTraDanhMucKhop = (itemNhom, currentCategory) => {
    if (currentCategory === "Tất cả") return true;
    if (!itemNhom) return false;
    const cat = itemNhom.toLowerCase();
    if (
      currentCategory === "Khai vị" &&
      (cat.includes("khai vị") || cat.includes("starter"))
    )
      return true;
    if (
      currentCategory === "Món chính" &&
      (cat.includes("món chính") ||
        cat.includes("main") ||
        cat.includes("mon_an"))
    )
      return true;
    if (
      currentCategory === "Tráng miệng" &&
      (cat.includes("tráng miệng") || cat.includes("dessert"))
    )
      return true;
    if (
      currentCategory === "Đồ uống" &&
      (cat.includes("uống") ||
        cat.includes("drink") ||
        cat.includes("thuc_uong"))
    )
      return true;
    return itemNhom === currentCategory;
  };

  const filteredItems = menuItems.filter((mon) =>
    kiemTraDanhMucKhop(mon.nhom || mon.danhMuc, nhom),
  );

  const getSoLuong = (id) =>
    selectedItems.find((item) => item.monAnId === id)?.soLuong || 0;

  const tangSoLuong = (mon) =>
    setSelectedItems((items) => {
      const daCo = items.find((item) => item.monAnId === mon.id);
      return daCo
        ? items.map((item) =>
            item.monAnId === mon.id
              ? { ...item, soLuong: item.soLuong + 1 }
              : item,
          )
        : [...items, { monAnId: mon.id, soLuong: 1 }];
    });

  const giamSoLuong = (mon) =>
    setSelectedItems((items) =>
      items.flatMap((item) =>
        item.monAnId !== mon.id
          ? [item]
          : item.soLuong > 1
            ? [{ ...item, soLuong: item.soLuong - 1 }]
            : [],
      ),
    );

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 3
      </p>
      <h1
        className="mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Đặt trước món ăn
      </h1>
      <p
        className="mb-7 mt-2 text-sm"
        style={{ color: "rgba(240,216,144,.42)" }}
      >
        Quý khách có thể bỏ qua bước này và gọi món trực tiếp tại bàn.
      </p>

      {/* Danh mục tự động đồng bộ từ Backend, không cần lưu const */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {[
          "Tất cả",
          ...new Set(menuItems.map((m) => m.nhom || m.danhMuc).filter(Boolean)),
        ].map((category) => (
          <button
            key={category}
            onClick={() => setNhom(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs ${nhom === category ? "btn-primary" : "btn-ghost"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredItems.length === 0 && (
          <p className="py-8 text-center text-sm opacity-40">
            Đang tải thực đơn...
          </p>
        )}
        {filteredItems.map((mon) => (
          <div
            key={mon.id}
            className="flex gap-3 rounded-xl p-3"
            style={{
              background: "rgba(200,136,42,.035)",
              border: "1px solid rgba(200,136,42,.08)",
            }}
          >
            <img
              src={mon.anh}
              alt={mon.ten}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{mon.ten}</p>
              <p
                className="mt-1 text-xs line-clamp-1"
                style={{ color: "rgba(240,216,144,.38)" }}
              >
                {mon.moTa}
              </p>
              <p
                className="mt-2 text-xs font-semibold"
                style={{ color: "rgba(232,184,75,.8)" }}
              >
                {Number(mon.gia || 0).toLocaleString("vi-VN")}₫
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => giamSoLuong(mon)}
                disabled={!getSoLuong(mon.id)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)] disabled:opacity-30 flex items-center justify-center font-bold"
              >
                −
              </button>
              <span className="w-5 text-center text-sm">
                {getSoLuong(mon.id)}
              </span>
              <button
                onClick={() => tangSoLuong(mon)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)] flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={onQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Quay lại
        </button>
        <button
          onClick={onTiepTuc}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
export default MenuSelection;
