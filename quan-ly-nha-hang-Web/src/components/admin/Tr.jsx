import { useState } from "react";

export default function Tr({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: hovered ? "#fffdf8" : "#fff",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.1s",
      }}
    >
      {children}
    </tr>
  );
}
