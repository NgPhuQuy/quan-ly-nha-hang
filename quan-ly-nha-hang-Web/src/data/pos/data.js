export const FOOD_CATEGORIES = ["T\u1EA5t c\u1EA3", "C\u01A1m", "B\xFAn/Ph\u1EDF", "\u0110\u1ED3 u\u1ED1ng", "Tr\xE1ng mi\u1EC7ng", "Khai v\u1ECB"];
export const mockFoods = [
  { id: "f1", name: "C\u01A1m t\u1EA5m s\u01B0\u1EDDn b\xEC ch\u1EA3", category: "C\u01A1m", price: 65e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9e1c2?w=300&h=200&fit=crop&auto=format" },
  { id: "f2", name: "Ph\u1EDF b\xF2 t\xE1i n\u1EA1m", category: "B\xFAn/Ph\u1EDF", price: 75e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop&auto=format" },
  { id: "f3", name: "B\xFAn b\xF2 Hu\u1EBF", category: "B\xFAn/Ph\u1EDF", price: 7e4, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=200&fit=crop&auto=format" },
  { id: "f4", name: "G\u1ECFi cu\u1ED1n t\xF4m th\u1ECBt", category: "Khai v\u1ECB", price: 45e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=300&h=200&fit=crop&auto=format" },
  { id: "f5", name: "C\xE0 ph\xEA s\u1EEFa \u0111\xE1", category: "\u0110\u1ED3 u\u1ED1ng", price: 35e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop&auto=format" },
  { id: "f6", name: "N\u01B0\u1EDBc m\xEDa t\u01B0\u01A1i", category: "\u0110\u1ED3 u\u1ED1ng", price: 25e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop&auto=format" },
  { id: "f7", name: "C\u01A1m g\xE0 x\u1ED1i m\u1EE1", category: "C\u01A1m", price: 7e4, status: "H\u1EBFt m\xF3n", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop&auto=format" },
  { id: "f8", name: "B\xE1nh flan caramel", category: "Tr\xE1ng mi\u1EC7ng", price: 3e4, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop&auto=format" },
  { id: "f9", name: "M\xEC Qu\u1EA3ng g\xE0", category: "B\xFAn/Ph\u1EDF", price: 68e3, status: "T\u1EA1m ng\u01B0ng", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop&auto=format" },
  { id: "f10", name: "Tr\xE0 \u0111\xE0o cam s\u1EA3", category: "\u0110\u1ED3 u\u1ED1ng", price: 4e4, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=300&h=200&fit=crop&auto=format" },
  { id: "f11", name: "Ch\u1EA3 gi\xF2 chi\xEAn", category: "Khai v\u1ECB", price: 5e4, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=300&h=200&fit=crop&auto=format" },
  { id: "f12", name: "Ch\xE8 ba m\xE0u", category: "Tr\xE1ng mi\u1EC7ng", price: 28e3, status: "\u0110ang b\xE1n", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop&auto=format" }
];
export const mockInvoices = [
  { id: "HD-0041", createdAt: "2025-01-15 12:34", source: "WALK_IN", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f1", name: "C\u01A1m t\u1EA5m s\u01B0\u1EDDn b\xEC ch\u1EA3", unitPrice: 65e3, quantity: 2 }, { foodId: "f5", name: "C\xE0 ph\xEA s\u1EEFa \u0111\xE1", unitPrice: 35e3, quantity: 2 }], total: 2e5 },
  { id: "HD-0040", createdAt: "2025-01-15 11:10", source: "ONLINE", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f2", name: "Ph\u1EDF b\xF2 t\xE1i n\u1EA1m", unitPrice: 75e3, quantity: 1 }, { foodId: "f6", name: "N\u01B0\u1EDBc m\xEDa t\u01B0\u01A1i", unitPrice: 25e3, quantity: 1 }], total: 1e5 },
  { id: "HD-0039", createdAt: "2025-01-15 10:22", source: "WALK_IN", status: "Ch\u1EDD x\u1EED l\xFD", items: [{ foodId: "f3", name: "B\xFAn b\xF2 Hu\u1EBF", unitPrice: 7e4, quantity: 3 }], total: 21e4 },
  { id: "HD-0038", createdAt: "2025-01-15 09:55", source: "ONLINE", status: "\u0110\xE3 h\u1EE7y", items: [{ foodId: "f4", name: "G\u1ECFi cu\u1ED1n t\xF4m th\u1ECBt", unitPrice: 45e3, quantity: 2 }], total: 9e4 },
  { id: "HD-0037", createdAt: "2025-01-14 18:30", source: "WALK_IN", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f11", name: "Ch\u1EA3 gi\xF2 chi\xEAn", unitPrice: 5e4, quantity: 1 }, { foodId: "f2", name: "Ph\u1EDF b\xF2 t\xE1i n\u1EA1m", unitPrice: 75e3, quantity: 2 }, { foodId: "f10", name: "Tr\xE0 \u0111\xE0o cam s\u1EA3", unitPrice: 4e4, quantity: 2 }], total: 28e4 },
  { id: "HD-0036", createdAt: "2025-01-14 17:15", source: "ONLINE", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f1", name: "C\u01A1m t\u1EA5m s\u01B0\u1EDDn b\xEC ch\u1EA3", unitPrice: 65e3, quantity: 1 }, { foodId: "f8", name: "B\xE1nh flan caramel", unitPrice: 3e4, quantity: 2 }], total: 125e3 },
  { id: "HD-0035", createdAt: "2025-01-14 16:00", source: "WALK_IN", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f3", name: "B\xFAn b\xF2 Hu\u1EBF", unitPrice: 7e4, quantity: 2 }, { foodId: "f5", name: "C\xE0 ph\xEA s\u1EEFa \u0111\xE1", unitPrice: 35e3, quantity: 3 }], total: 245e3 },
  { id: "HD-0034", createdAt: "2025-01-13 13:45", source: "ONLINE", status: "Ch\u1EDD x\u1EED l\xFD", items: [{ foodId: "f2", name: "Ph\u1EDF b\xF2 t\xE1i n\u1EA1m", unitPrice: 75e3, quantity: 2 }], total: 15e4 },
  { id: "HD-0033", createdAt: "2025-01-13 12:20", source: "WALK_IN", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f4", name: "G\u1ECFi cu\u1ED1n t\xF4m th\u1ECBt", unitPrice: 45e3, quantity: 3 }, { foodId: "f6", name: "N\u01B0\u1EDBc m\xEDa t\u01B0\u01A1i", unitPrice: 25e3, quantity: 3 }], total: 21e4 },
  { id: "HD-0032", createdAt: "2025-01-12 11:30", source: "ONLINE", status: "Ho\xE0n th\xE0nh", items: [{ foodId: "f1", name: "C\u01A1m t\u1EA5m s\u01B0\u1EDDn b\xEC ch\u1EA3", unitPrice: 65e3, quantity: 3 }, { foodId: "f5", name: "C\xE0 ph\xEA s\u1EEFa \u0111\xE1", unitPrice: 35e3, quantity: 3 }], total: 3e5 }
];
export const mockTransactions = [
  { id: "TC-001", date: "2025-01-15", type: "Thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu h\xF3a \u0111\u01A1n ng\xE0y 15/01", amount: 185e4, note: "" },
  { id: "TC-002", date: "2025-01-15", type: "Chi", category: "Nguy\xEAn v\u1EADt li\u1EC7u", description: "Mua nguy\xEAn li\u1EC7u t\u1EEB ch\u1EE3 \u0111\u1EA7u m\u1ED1i", amount: 45e4, note: "Thanh to\xE1n ti\u1EC1n m\u1EB7t" },
  { id: "TC-003", date: "2025-01-14", type: "Thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu h\xF3a \u0111\u01A1n ng\xE0y 14/01", amount: 21e5 },
  { id: "TC-004", date: "2025-01-14", type: "Chi", category: "\u0110i\u1EC7n n\u01B0\u1EDBc", description: "Ti\u1EC1n \u0111i\u1EC7n th\xE1ng 1/2025", amount: 68e4 },
  { id: "TC-005", date: "2025-01-13", type: "Thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu h\xF3a \u0111\u01A1n ng\xE0y 13/01", amount: 162e4 },
  { id: "TC-006", date: "2025-01-13", type: "Chi", category: "Nh\xE2n s\u1EF1", description: "L\u01B0\u01A1ng nh\xE2n vi\xEAn tu\u1EA7n 2", amount: 28e5 },
  { id: "TC-007", date: "2025-01-12", type: "Thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu h\xF3a \u0111\u01A1n ng\xE0y 12/01", amount: 198e4 },
  { id: "TC-008", date: "2025-01-12", type: "Chi", category: "Nguy\xEAn v\u1EADt li\u1EC7u", description: "Nh\u1EADp h\xE0ng th\u1EF1c ph\u1EA9m t\u01B0\u01A1i s\u1ED1ng", amount: 52e4 },
  { id: "TC-009", date: "2025-01-11", type: "Chi", category: "Thu\xEA m\u1EB7t b\u1EB1ng", description: "Ti\u1EC1n thu\xEA chi nh\xE1nh th\xE1ng 1", amount: 5e6 },
  { id: "TC-010", date: "2025-01-10", type: "Thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu h\xF3a \u0111\u01A1n ng\xE0y 10/01", amount: 225e4 }
];
export const revenueByDay = [
  { date: "08/01", revenue: 12e5, invoices: 18 },
  { date: "09/01", revenue: 158e4, invoices: 22 },
  { date: "10/01", revenue: 225e4, invoices: 31 },
  { date: "11/01", revenue: 182e4, invoices: 26 },
  { date: "12/01", revenue: 198e4, invoices: 28 },
  { date: "13/01", revenue: 162e4, invoices: 23 },
  { date: "14/01", revenue: 21e5, invoices: 29 },
  { date: "15/01", revenue: 185e4, invoices: 24 }
];
export const revenueBySource = [
  { name: "WALK_IN", value: 85e5, label: "T\u1EA1i qu\u1EA7y" },
  { name: "ONLINE", value: 59e5, label: "\u0110\u1EB7t online" }
];
export const expenseByCategory = [
  { category: "Nguy\xEAn v\u1EADt li\u1EC7u", amount: 32e5, pct: 38 },
  { category: "Nh\xE2n s\u1EF1", amount: 28e5, pct: 33 },
  { category: "Thu\xEA m\u1EB7t b\u1EB1ng", amount: 15e5, pct: 18 },
  { category: "\u0110i\u1EC7n n\u01B0\u1EDBc", amount: 68e4, pct: 8 },
  { category: "Kh\xE1c", amount: 22e4, pct: 3 }
];
export const formatCurrency = (amount) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
export const formatCurrencyShort = (amount) => {
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}tr`;
  if (amount >= 1e3) return `${(amount / 1e3).toFixed(0)}k`;
  return amount.toString();
};
