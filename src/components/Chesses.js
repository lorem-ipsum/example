import React from "react";
import Chess from "./Chess";

function Chesses({ board, size, num }) {
  return board.map(
    (c, index) =>
      c && (
        <Chess
          key={index}
          size={size}
          x={index % num}
          y={Math.floor(index / num)}
          color={c}
        />
      )
  );
}

export default Chesses;
