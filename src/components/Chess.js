import React from "react";

function Chess({ size, x, y, color, trsp = false }) {
  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: size * x + "px",
        top: size * y + "px",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 3}
        stroke="black"
        strokeWidth="2"
        fill={color}
        opacity={trsp ? 0.5 : 1}
      />
    </svg>
  );
}

export default Chess;
