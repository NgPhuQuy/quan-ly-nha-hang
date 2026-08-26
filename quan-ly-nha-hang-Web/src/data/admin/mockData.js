export const branches = [
  { id: "CN001", name: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", address: "12 H\xE0ng B\u1EA1c, Ho\xE0n Ki\u1EBFm, H\xE0 N\u1ED9i", phone: "024 3825 1234", status: "active", revenue: 285e6 },
  { id: "CN002", name: "Chi nh\xE1nh Ba \u0110\xECnh", address: "45 \u0110\u1ED9i C\u1EA5n, Ba \u0110\xECnh, H\xE0 N\u1ED9i", phone: "024 3762 5678", status: "active", revenue: 198e6 },
  { id: "CN003", name: "Chi nh\xE1nh C\u1EA7u Gi\u1EA5y", address: "78 Tr\u1EA7n Th\xE1i T\xF4ng, C\u1EA7u Gi\u1EA5y, H\xE0 N\u1ED9i", phone: "024 3795 9012", status: "active", revenue: 312e6 },
  { id: "CN004", name: "Chi nh\xE1nh \u0110\u1ED1ng \u0110a", address: "23 T\xE2y S\u01A1n, \u0110\u1ED1ng \u0110a, H\xE0 N\u1ED9i", phone: "024 3851 3456", status: "inactive", revenue: 0 },
  { id: "CN005", name: "Chi nh\xE1nh Thanh Xu\xE2n", address: "156 Nguy\u1EC5n Tr\xE3i, Thanh Xu\xE2n, H\xE0 N\u1ED9i", phone: "024 3858 7890", status: "active", revenue: 241e6 }
];
export const users = [
  { id: 1, name: "Nguy\u1EC5n V\u0103n Minh", email: "minh.nv@restaurant.vn", role: "Manager", branch: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", status: "active", createdAt: "2024-01-15" },
  { id: 2, name: "Tr\u1EA7n Th\u1ECB Lan", email: "lan.tt@restaurant.vn", role: "Staff", branch: "Chi nh\xE1nh Ba \u0110\xECnh", status: "active", createdAt: "2024-02-20" },
  { id: 3, name: "L\xEA Qu\u1ED1c H\xF9ng", email: "hung.lq@restaurant.vn", role: "Manager", branch: "Chi nh\xE1nh C\u1EA7u Gi\u1EA5y", status: "active", createdAt: "2024-01-08" },
  { id: 4, name: "Ph\u1EA1m Th\u1ECB Hoa", email: "hoa.pt@restaurant.vn", role: "Staff", branch: "Chi nh\xE1nh Thanh Xu\xE2n", status: "inactive", createdAt: "2024-03-12" },
  { id: 5, name: "Ho\xE0ng V\u0103n \u0110\u1EE9c", email: "duc.hv@restaurant.vn", role: "Admin", branch: "\u2014", status: "active", createdAt: "2023-11-01" },
  { id: 6, name: "V\u0169 Th\u1ECB Mai", email: "mai.vt@restaurant.vn", role: "Staff", branch: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", status: "active", createdAt: "2024-04-05" }
];
export const customers = [
  { id: 1, name: "Nguy\u1EC5n H\u1EA3i \u0110\u0103ng", phone: "0912 345 678", email: "dangnh@gmail.com", bookings: 8, totalSpent: 425e4, status: "active" },
  { id: 2, name: "Tr\u1EA7n Minh Ch\xE2u", phone: "0987 654 321", email: "chautm@gmail.com", bookings: 3, totalSpent: 18e5, status: "active" },
  { id: 3, name: "L\xEA Th\u1ECB B\xEDch Ng\u1ECDc", phone: "0903 111 222", email: "ngocltb@gmail.com", bookings: 12, totalSpent: 765e4, status: "active" },
  { id: 4, name: "Ph\u1EA1m V\u0103n T\xF9ng", phone: "0921 333 444", email: "tungpv@gmail.com", bookings: 1, totalSpent: 52e4, status: "inactive" },
  { id: 5, name: "Ho\xE0ng Th\u1ECB Y\u1EBFn", phone: "0976 555 666", email: "yenht@gmail.com", bookings: 6, totalSpent: 31e5, status: "active" },
  { id: 6, name: "\u0110inh Quang Kh\u1EA3i", phone: "0934 777 888", email: "khaidq@gmail.com", bookings: 15, totalSpent: 92e5, status: "active" }
];
export const categories = [
  { id: 1, name: "Khai v\u1ECB", description: "C\xE1c m\xF3n \u0103n khai v\u1ECB", itemCount: 8, status: "active" },
  { id: 2, name: "M\xF3n ch\xEDnh", description: "C\xE1c m\xF3n \u0103n ch\xEDnh", itemCount: 24, status: "active" },
  { id: 3, name: "\u0110\u1ED3 u\u1ED1ng", description: "N\u01B0\u1EDBc gi\u1EA3i kh\xE1t v\xE0 cocktail", itemCount: 18, status: "active" },
  { id: 4, name: "Tr\xE1ng mi\u1EC7ng", description: "B\xE1nh v\xE0 kem", itemCount: 10, status: "active" },
  { id: 5, name: "L\u1EA9u & N\u01B0\u1EDBng", description: "C\xE1c m\xF3n l\u1EA9u v\xE0 n\u01B0\u1EDBng \u0111\u1EB7c s\u1EA3n", itemCount: 6, status: "active" }
];
export const foods = [
  { id: 1, name: "Ph\u1EDF b\xF2 \u0111\u1EB7c bi\u1EC7t", category: "M\xF3n ch\xEDnh", price: 85e3, status: "active", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=80&h=80&fit=crop&auto=format" },
  { id: 2, name: "B\xFAn ch\u1EA3 H\xE0 N\u1ED9i", category: "M\xF3n ch\xEDnh", price: 75e3, status: "active", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&h=80&fit=crop&auto=format" },
  { id: 3, name: "Nem cu\u1ED1n t\xF4m th\u1ECBt", category: "Khai v\u1ECB", price: 45e3, status: "active", image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=80&h=80&fit=crop&auto=format" },
  { id: 4, name: "Ch\xE8 ba m\xE0u", category: "Tr\xE1ng mi\u1EC7ng", price: 35e3, status: "active", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&h=80&fit=crop&auto=format" },
  { id: 5, name: "Tr\xE0 chanh s\u1EA3", category: "\u0110\u1ED3 u\u1ED1ng", price: 29e3, status: "active", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&h=80&fit=crop&auto=format" },
  { id: 6, name: "G\u1ECFi cu\u1ED1n chay", category: "Khai v\u1ECB", price: 4e4, status: "inactive", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=80&h=80&fit=crop&auto=format" },
  { id: 7, name: "L\u1EA9u th\xE1i h\u1EA3i s\u1EA3n", category: "L\u1EA9u & N\u01B0\u1EDBng", price: 45e4, status: "active", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&h=80&fit=crop&auto=format" },
  { id: 8, name: "C\xE0 ph\xEA tr\u1EE9ng", category: "\u0110\u1ED3 u\u1ED1ng", price: 45e3, status: "active", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop&auto=format" }
];
export const tables = [
  { id: 1, name: "B\xE0n 01", branch: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", capacity: 2, status: "available" },
  { id: 2, name: "B\xE0n 02", branch: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", capacity: 4, status: "occupied" },
  { id: 3, name: "B\xE0n 03", branch: "Chi nh\xE1nh Ba \u0110\xECnh", capacity: 6, status: "available" },
  { id: 4, name: "B\xE0n 04", branch: "Chi nh\xE1nh C\u1EA7u Gi\u1EA5y", capacity: 4, status: "reserved" },
  { id: 5, name: "B\xE0n 05", branch: "Chi nh\xE1nh C\u1EA7u Gi\u1EA5y", capacity: 8, status: "available" },
  { id: 6, name: "B\xE0n 06", branch: "Chi nh\xE1nh Thanh Xu\xE2n", capacity: 2, status: "occupied" },
  { id: 7, name: "B\xE0n 07", branch: "Chi nh\xE1nh Thanh Xu\xE2n", capacity: 4, status: "available" },
  { id: 8, name: "VIP 01", branch: "Chi nh\xE1nh Ho\xE0n Ki\u1EBFm", capacity: 10, status: "reserved" }
];
export const invoices = [
  { id: "HD001", branch: "CN Ho\xE0n Ki\u1EBFm", time: "2024-06-15 12:30", source: "WALK-IN", total: 285e3, status: "paid" },
  { id: "HD002", branch: "CN Ba \u0110\xECnh", time: "2024-06-15 13:15", source: "ONLINE", total: 52e4, status: "paid" },
  { id: "HD003", branch: "CN C\u1EA7u Gi\u1EA5y", time: "2024-06-15 14:00", source: "WALK-IN", total: 175e3, status: "paid" },
  { id: "HD004", branch: "CN Thanh Xu\xE2n", time: "2024-06-15 14:45", source: "ONLINE", total: 68e4, status: "pending" },
  { id: "HD005", branch: "CN Ho\xE0n Ki\u1EBFm", time: "2024-06-15 15:30", source: "WALK-IN", total: 42e4, status: "paid" },
  { id: "HD006", branch: "CN C\u1EA7u Gi\u1EA5y", time: "2024-06-15 16:00", source: "ONLINE", total: 31e4, status: "cancelled" },
  { id: "HD007", branch: "CN Ba \u0110\xECnh", time: "2024-06-15 17:15", source: "WALK-IN", total: 195e3, status: "paid" },
  { id: "HD008", branch: "CN Thanh Xu\xE2n", time: "2024-06-15 18:00", source: "WALK-IN", total: 875e3, status: "paid" }
];
export const bookings = [
  { id: "DL001", customer: "Nguy\u1EC5n H\u1EA3i \u0110\u0103ng", branch: "CN Ho\xE0n Ki\u1EBFm", datetime: "2024-06-20 18:00", guests: 4, status: "confirmed" },
  { id: "DL002", customer: "Tr\u1EA7n Minh Ch\xE2u", branch: "CN C\u1EA7u Gi\u1EA5y", datetime: "2024-06-21 12:00", guests: 2, status: "pending" },
  { id: "DL003", customer: "L\xEA Th\u1ECB B\xEDch Ng\u1ECDc", branch: "CN Ba \u0110\xECnh", datetime: "2024-06-21 19:00", guests: 6, status: "confirmed" },
  { id: "DL004", customer: "\u0110inh Quang Kh\u1EA3i", branch: "CN Thanh Xu\xE2n", datetime: "2024-06-22 20:00", guests: 8, status: "confirmed" },
  { id: "DL005", customer: "Ho\xE0ng Th\u1ECB Y\u1EBFn", branch: "CN Ho\xE0n Ki\u1EBFm", datetime: "2024-06-23 18:30", guests: 3, status: "cancelled" },
  { id: "DL006", customer: "Ph\u1EA1m V\u0103n T\xF9ng", branch: "CN C\u1EA7u Gi\u1EA5y", datetime: "2024-06-24 19:00", guests: 2, status: "pending" }
];
export const promotions = [
  { id: 1, name: "Khuy\u1EBFn m\xE3i sinh nh\u1EADt", discount: "20%", startDate: "2024-06-01", endDate: "2024-06-30", status: "active", branch: "T\u1EA5t c\u1EA3 chi nh\xE1nh" },
  { id: 2, name: "Happy Hour chi\u1EC1u", discount: "15%", startDate: "2024-06-01", endDate: "2024-07-31", status: "active", branch: "CN Ho\xE0n Ki\u1EBFm, CN Ba \u0110\xECnh" },
  { id: 3, name: "Gi\u1EA3m gi\xE1 cu\u1ED1i tu\u1EA7n", discount: "10%", startDate: "2024-05-01", endDate: "2024-05-31", status: "expired", branch: "T\u1EA5t c\u1EA3 chi nh\xE1nh" },
  { id: 4, name: "Combo gia \u0111\xECnh", discount: "25%", startDate: "2024-07-01", endDate: "2024-07-31", status: "upcoming", branch: "CN C\u1EA7u Gi\u1EA5y" },
  { id: 5, name: "Kh\xE1ch h\xE0ng th\xE2n thi\u1EBFt", discount: "30%", startDate: "2024-01-01", endDate: "2024-12-31", status: "active", branch: "T\u1EA5t c\u1EA3 chi nh\xE1nh" }
];
export const financeItems = [
  { id: 1, date: "2024-06-15", branch: "CN Ho\xE0n Ki\u1EBFm", type: "thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu bu\u1ED5i s\xE1ng", amount: 485e4 },
  { id: 2, date: "2024-06-15", branch: "CN Ba \u0110\xECnh", type: "chi", category: "Nguy\xEAn v\u1EADt li\u1EC7u", description: "Mua th\u1EF1c ph\u1EA9m", amount: 12e5 },
  { id: 3, date: "2024-06-15", branch: "CN C\u1EA7u Gi\u1EA5y", type: "thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu bu\u1ED5i chi\u1EC1u", amount: 632e4 },
  { id: 4, date: "2024-06-15", branch: "CN Thanh Xu\xE2n", type: "chi", category: "Nh\xE2n s\u1EF1", description: "L\u01B0\u01A1ng nh\xE2n vi\xEAn th\xE1ng 6", amount: 85e5 },
  { id: 5, date: "2024-06-14", branch: "CN Ho\xE0n Ki\u1EBFm", type: "chi", category: "Ti\u1EC7n \xEDch", description: "H\xF3a \u0111\u01A1n \u0111i\u1EC7n th\xE1ng 6", amount: 21e5 },
  { id: 6, date: "2024-06-14", branch: "CN Ba \u0110\xECnh", type: "thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu ng\xE0y 14", amount: 568e4 },
  { id: 7, date: "2024-06-14", branch: "CN C\u1EA7u Gi\u1EA5y", type: "chi", category: "Marketing", description: "Qu\u1EA3ng c\xE1o m\u1EA1ng x\xE3 h\u1ED9i", amount: 5e5 },
  { id: 8, date: "2024-06-13", branch: "CN Thanh Xu\xE2n", type: "thu", category: "Doanh thu b\xE1n h\xE0ng", description: "Doanh thu ng\xE0y 13", amount: 724e4 }
];
export const revenueByMonth = [
  { month: "T1", revenue: 182e6, target: 2e8 },
  { month: "T2", revenue: 165e6, target: 19e7 },
  { month: "T3", revenue: 215e6, target: 21e7 },
  { month: "T4", revenue: 198e6, target: 21e7 },
  { month: "T5", revenue: 242e6, target: 23e7 },
  { month: "T6", revenue: 285e6, target: 25e7 }
];
export const revenueByBranch = [
  { name: "CN C\u1EA7u Gi\u1EA5y", revenue: 312e6 },
  { name: "CN Ho\xE0n Ki\u1EBFm", revenue: 285e6 },
  { name: "CN Thanh Xu\xE2n", revenue: 241e6 },
  { name: "CN Ba \u0110\xECnh", revenue: 198e6 },
  { name: "CN \u0110\u1ED1ng \u0110a", revenue: 0 }
];
export const revenueBySource = [
  { name: "WALK-IN", value: 65, color: "#c9922a" },
  { name: "ONLINE", value: 35, color: "#4ade80" }
];
