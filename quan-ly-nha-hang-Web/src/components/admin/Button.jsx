import { useState } from "react";

const buttonStyles = {
  primary: { background: "#c9922a", color: "#fff", border: "none" },
  secondary: {
    background: "#f5f0e8",
    color: "#2c1a0e",
    border: "1px solid #e5ddd0",
  },
  ghost: {
    background: "transparent",
    color: "#5a4030",
    border: "1px solid #e5ddd0",
  },
  danger: { background: "#fee2e2", color: "#b91c1c", border: "none" },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
}) {
  const [hovered, setHovered] = useState(false);
  const padding = size === "sm" ? "5px 12px" : "8px 16px";
  const fontSize = size === "sm" ? 12 : 13.5;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding,
        borderRadius: 8,
        fontFamily: "inherit",
        fontWeight: 600,
        fontSize,
        cursor: "pointer",
        transition: "opacity 0.12s, box-shadow 0.12s",
        opacity: hovered ? 0.88 : 1,
        ...buttonStyles[variant],
      }}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </button>
  );
}
