import { useState } from "react";
export default function Table({ headers, children }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  padding: "10px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7a6248",
                  borderBottom: "1px solid #e5ddd0",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  background: "#fafaf8",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}


export function Tr({ children, onClick }) {
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
