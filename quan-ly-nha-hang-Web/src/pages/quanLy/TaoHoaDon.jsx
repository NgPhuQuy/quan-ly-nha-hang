import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { mockFoods, FOOD_CATEGORIES } from "../../data/quanLyMock";
import { layTatCaMonAn } from "../../services/monAn.service";
import { taoHoaDon } from "../../services/hoaDon.service";
import { dinhDangTien } from "../../utils/dinhDang";
const statusBg = {
  "Đang bán": {
    bg: "#F0FDF4",
    text: "#16A34A",
  },
  "Hết món": {
    bg: "#FEF2F2",
    text: "#DC2626",
  },
  "Tạm ngưng": {
    bg: "#FFFBEB",
    text: "#D97706",
  },
};
function CreateInvoice({ onNavigate }) {
  const [allFoods, setAllFoods] = useState(mockFoods);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Tất cả");
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    layTatCaMonAn().then((data) => {
      if (data && data.length > 0) {
        setAllFoods(data);
      }
    });
  }, []);

  const foods = allFoods.filter((f) => {
    if (catFilter !== "Tất cả" && f.category !== catFilter) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  const addToCart = (food) => {
    if (food.status !== "Đang bán") return;
    setCart((prev) => {
      const existing = prev.find((c) => c.foodId === food.id);
      if (existing)
        return prev.map((c) =>
          c.foodId === food.id
            ? {
                ...c,
                quantity: c.quantity + 1,
              }
            : c,
        );
      return [
        ...prev,
        {
          foodId: food.id,
          name: food.name,
          unitPrice: food.price,
          quantity: 1,
        },
      ];
    });
  };
  const updateQty = (foodId, delta) => {
    setCart((prev) =>
      prev.map((c) =>
        c.foodId === foodId
          ? {
              ...c,
              quantity: Math.max(1, c.quantity + delta),
            }
          : c,
      ),
    );
  };
  const remove = (foodId) =>
    setCart((prev) => prev.filter((c) => c.foodId !== foodId));
  const total = cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);

  const handleCreate = async () => {
    if (cart.length === 0) return;
    try {
      await taoHoaDon({
        maChiNhanh: 1,
        nguon: "WALK_IN",
        trangThai: "Hoàn thành",
        tenKhachHang: "Khách tại quầy",
        items: cart.map((c) => ({
          maMatHang: typeof c.foodId === "number" ? c.foodId : 1,
          soLuong: c.quantity,
          donGia: c.unitPrice,
        })),
      });
    } catch (e) {
      console.warn("Create invoice API call failed:", e);
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setCart([]);
      onNavigate("invoices");
    }, 1200);
  };
  return (
    <div className="flex h-full overflow-hidden">
      <div
        className="flex-1 flex flex-col border-r overflow-hidden"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div
          className="px-5 py-3 border-b flex items-center gap-3 bg-white"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <button
            onClick={() => onNavigate("invoices")}
            className="flex items-center gap-1.5 text-sm font-500"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            <ArrowLeft size={15} /> Quay lại
          </button>
          <span
            style={{
              color: "var(--border)",
            }}
          >
            |
          </span>
          <span
            className="text-sm font-600"
            style={{
              color: "var(--foreground)",
            }}
          >
            Tạo hóa đơn – Tại quầy
          </span>
        </div>
        <div
          className="px-5 py-3 bg-white border-b flex items-center gap-3"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="relative flex-1 max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{
                color: "var(--muted-foreground)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm món ăn..."
              className="w-full text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
              style={{
                borderColor: "var(--border)",
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {FOOD_CATEGORIES.map((cat) => (
              <button
                onClick={() => setCatFilter(cat)}
                className="px-3 py-1 rounded-full text-xs font-500 transition-colors"
                style={{
                  background:
                    catFilter === cat ? "var(--primary)" : "var(--secondary)",
                  color:
                    catFilter === cat ? "white" : "var(--secondary-foreground)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
            {foods.map((food) => {
              const inCart = cart.find((c) => c.foodId === food.id);
              const unavailable = food.status !== "Đang bán";
              return (
                <button
                  onClick={() => addToCart(food)}
                  disabled={unavailable}
                  className="bg-white rounded-xl border text-left overflow-hidden transition-all disabled:opacity-60"
                  style={{
                    borderColor: inCart ? "var(--primary)" : "var(--border)",
                    boxShadow: inCart ? "0 0 0 1px var(--primary)" : void 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!unavailable)
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = inCart
                      ? "0 0 0 1px var(--primary)"
                      : "none";
                  }}
                >
                  <div className="relative h-32 overflow-hidden bg-[var(--secondary)]">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded font-500"
                      style={{
                        background: statusBg[food.status].bg,
                        color: statusBg[food.status].text,
                      }}
                    >
                      {food.status}
                    </span>
                    {inCart && (
                      <span
                        className="absolute top-2 left-2 w-5 h-5 rounded-full text-xs font-700 flex items-center justify-center text-white"
                        style={{
                          background: "var(--primary)",
                        }}
                      >
                        {inCart.quantity}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div
                      className="text-xs font-600 leading-snug mb-1"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {food.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {food.category}
                    </div>
                    <div
                      className="text-sm font-700 mt-1.5"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {dinhDangTien(food.price)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-80 shrink-0 flex flex-col bg-white">
        <div
          className="px-5 py-3.5 border-b"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={16}
              style={{
                color: "var(--primary)",
              }}
            />
            <span
              className="text-sm font-700"
              style={{
                color: "var(--foreground)",
              }}
            >
              Hóa đơn
            </span>
            {cart.length > 0 && (
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-600 text-white"
                style={{
                  background: "var(--primary)",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-10">
              <ShoppingBag
                size={32}
                style={{
                  color: "var(--border)",
                }}
              />
              <p
                className="text-sm"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Chưa có món nào
              </p>
              <p
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Chọn món từ menu bên trái
              </p>
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  className="flex items-start gap-3 py-2.5 border-b"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-600 leading-snug"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {dinhDangTien(item.unitPrice)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => updateQty(item.foodId, -1)}
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-[var(--secondary)]"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    >
                      <Minus size={10} />
                    </button>
                    <span
                      className="w-6 text-center text-xs font-600"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.foodId, 1)}
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-[var(--secondary)]"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => remove(item.foodId)}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-50 ml-0.5"
                    >
                      <Trash2
                        size={11}
                        style={{
                          color: "#DC2626",
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="p-4 border-t"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-sm font-600"
              style={{
                color: "var(--foreground)",
              }}
            >
              Tổng tiền
            </span>
            <span
              className="text-base font-700"
              style={{
                color: "var(--primary)",
              }}
            >
              {dinhDangTien(total)}
            </span>
          </div>
          <button
            onClick={handleCreate}
            disabled={cart.length === 0}
            className="w-full py-2.5 rounded-lg text-sm font-600 transition-opacity disabled:opacity-50 hover:opacity-90"
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            {success ? "✓ Đã tạo hóa đơn!" : "Tạo hóa đơn"}
          </button>
        </div>
      </div>
    </div>
  );
}
export { CreateInvoice as default };
