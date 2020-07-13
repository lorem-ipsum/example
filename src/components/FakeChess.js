import React from "react";
import Chess from "./Chess";
import useMousePosition from "./UseMousePosition";

function FakeChess({ size, num, x0, y0, board, winner, step }) {
  let { xm, ym } = useMousePosition();

  function ijToN(i, j) {
    return i + j * num;
  }

  return (
    0 <= Math.floor((xm - x0) / size) &&
    Math.floor((xm - x0) / size) < num &&
    0 <= Math.floor((ym - y0) / size) &&
    Math.floor((ym - y0) / size) < num &&
    board[ijToN(Math.floor((xm - x0) / size), Math.floor((ym - y0) / size))] ===
      null &&
    winner === null && (
      <Chess
        size={size}
        x={Math.floor((xm - x0) / size)}
        y={Math.floor((ym - y0) / size)}
        color={step % 2 === 0 ? "black" : "white"}
        trsp={true}
      />
    )
  );
}

export default FakeChess;
