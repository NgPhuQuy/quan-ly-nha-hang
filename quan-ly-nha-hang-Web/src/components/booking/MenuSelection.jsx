import { useState } from "react";

function MenuSelection({ menuItems, selectedItems, setSelectedItems, onContinue, onBack }) {
  const [nhom, setNhom] = useState("All");
  const menuCategories = ["All", "Starters", "Main courses", "Desserts", "Drinks"];
  const filteredItems =
    nhom === "All"
      ? menuItems
      : menuItems.filter((mon) => mon.nhom === nhom);
  const getQuantity = (id) =>
    selectedItems.find((item) => item.monAnId === id)?.soLuong || 0;
  const increaseQuantity = (mon) =>
    setSelectedItems((items) => {
      const daCo = items.find((item) => item.monAnId === mon.id);
      return daCo
        ? items.map((item) =>
            item.monAnId === mon.id ? { ...item, soLuong: item.soLuong + 1 } : item,
          )
        : [...items, { monAnId: mon.id, soLuong: 1 }];
    });
  const decreaseQuantity = (mon) =>
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
        Step 3
      </p>
      <h1
        className="mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Pre-order your dishes
      </h1>
      <p
        className="mb-7 mt-2 text-sm"
        style={{ color: "rgba(240,216,144,.42)" }}
      >
        You can skip this step and order at the restaurant.
      </p>
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {menuCategories.map((category) => (
          <button
            key={category}
            onClick={() => setNhom(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs ${nhom === category ? "btn-primary" : "btn-ghost"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredItems.length === 0 && (
          <p className="py-8 text-center text-sm opacity-40">
            Loading menu...
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
                className="mt-1 text-xs"
                style={{ color: "rgba(240,216,144,.38)" }}
              >
                {mon.moTa}
              </p>
              <p
                className="mt-2 text-xs"
                style={{ color: "rgba(232,184,75,.8)" }}
              >
                {mon.gia.toLocaleString("vi-VN")}₫
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(mon)}
                disabled={!getQuantity(mon.id)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)] disabled:opacity-30"
              >
                −
              </button>
              <span className="w-5 text-center text-sm">
                {getQuantity(mon.id)}
              </span>
              <button
                onClick={() => increaseQuantity(mon)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)]"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default MenuSelection;
