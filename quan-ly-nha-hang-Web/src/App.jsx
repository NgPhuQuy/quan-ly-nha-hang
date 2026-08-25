import { useState } from "react";
import TrangChu from "./pages/TrangChu";
import TrangDatBan from "./pages/TrangDatBan";
import TrangTraCuu from "./pages/TrangTraCuu";

function App() {
  const [manHinh, setManHinh] = useState("trangChu");
  const denTrang = (trang) => {
    setManHinh(trang);
    window.scrollTo(0, 0);
  };

  if (manHinh === "datBan")
    return <TrangDatBan khiQuayLai={() => denTrang("trangChu")} />;
  if (manHinh === "traCuu")
    return <TrangTraCuu khiQuayLai={() => denTrang("trangChu")} />;
  return (
    <TrangChu
      khiDatBan={() => denTrang("datBan")}
      khiTraCuu={() => denTrang("traCuu")}
    />
  );
}

export default App;
