import React, { useState, useEffect, useRef } from "react";
import Chesses from "./Chesses";
import FakeChess from "./FakeChess";

function Board({ num, size }) {
  let [winner, setWinner] = useState(null);
  let [step, setStep] = useState(0);
  let [board, setBoard] = useState(new Array(num * num).fill(null));
  let [{ x0, y0 }, set0] = useState({});
  const canvasRef = useRef(null);

  // Draw the board.
  useEffect(() => {
    const canvas = canvasRef.current;
    const x0 = canvas.getBoundingClientRect().left + window.pageXOffset;
    const y0 = canvas.getBoundingClientRect().top + window.pageYOffset;
    set0({ x0, y0 });

    const ctx = canvas.getContext("2d");
    for (let i = 0; i < num - 1; ++i) {
      for (let j = 0; j < num - 1; ++j) {
        ctx.strokeRect(i * size + size / 2, j * size + size / 2, size, size);
      }
    }
    ctx.strokeRect(size / 2, size / 2, (num - 1) * size, (num - 1) * size);
    ctx.strokeRect(
      size / 2 - 5,
      size / 2 - 5,
      (num - 1) * size + 10,
      (num - 1) * size + 10
    );
  }, [num, size]);

  // TODO: 判断胜负部分最终应当由后端来完成
  function calculateWinner() {
    if (num < 5) return null;
    for (let i = 0; i < num; ++i) {
      for (let j = 0; j < num; ++j) {
        if (
          i <= num - 5 &&
          board[ijToN(i, j)] &&
          board[ijToN(i, j)] === board[ijToN(i + 1, j)] &&
          board[ijToN(i, j)] === board[ijToN(i + 2, j)] &&
          board[ijToN(i, j)] === board[ijToN(i + 3, j)] &&
          board[ijToN(i, j)] === board[ijToN(i + 4, j)]
        )
          return board[ijToN(i, j)];
        else if (
          j <= num - 5 &&
          board[ijToN(i, j)] &&
          board[ijToN(i, j)] === board[ijToN(i, j + 1)] &&
          board[ijToN(i, j)] === board[ijToN(i, j + 2)] &&
          board[ijToN(i, j)] === board[ijToN(i, j + 3)] &&
          board[ijToN(i, j)] === board[ijToN(i, j + 4)]
        )
          return board[ijToN(i, j)];
        else if (
          i <= num - 5 &&
          j <= num - 5 &&
          board[ijToN(i, j)] &&
          board[ijToN(i, j)] === board[ijToN(i + 1, j + 1)] &&
          board[ijToN(i, j)] === board[ijToN(i + 2, j + 2)] &&
          board[ijToN(i, j)] === board[ijToN(i + 3, j + 3)] &&
          board[ijToN(i, j)] === board[ijToN(i + 4, j + 4)]
        )
          return board[ijToN(i, j)];
        else if (
          i >= 4 &&
          j <= num - 5 &&
          board[ijToN(i, j)] &&
          board[ijToN(i, j)] === board[ijToN(i - 1, j + 1)] &&
          board[ijToN(i, j)] === board[ijToN(i - 2, j + 2)] &&
          board[ijToN(i, j)] === board[ijToN(i - 3, j + 3)] &&
          board[ijToN(i, j)] === board[ijToN(i - 4, j + 4)]
        )
          return board[ijToN(i, j)];
      }
    }
    return null;
  }

  function ijToN(i, j) {
    return i + j * num;
  }

  // put a chess
  function handleClick(e) {
    let i = Math.floor((e.pageX - x0) / size);
    let j = Math.floor((e.pageY - y0) / size);
    if (winner || board[ijToN(i, j)]) return;
    const next = step % 2 === 0 ? "black" : "white";
    setBoard(board.fill(next, ijToN(i, j), ijToN(i, j) + 1));
    setWinner(calculateWinner());
    setStep(step + 1);
  }

  return (
    <div style={{ position: "relative" }}>
      <h2>
        Result:{" "}
        {winner ? "The winner is " + winner : step === num * num ? "tie" : "?"}
      </h2>
      <div
        style={{ margin: 0, padding: 0, position: "absolute" }}
        className="canvas-wrapper"
      >
        <canvas
          ref={canvasRef}
          width={num * size}
          height={num * size}
          onClick={handleClick}
        />
        <Chesses board={board} size={size} num={num} />

        <FakeChess
          size={size}
          num={num}
          x0={x0}
          y0={y0}
          board={board}
          winner={winner}
          step={step}
        />
      </div>
    </div>
  );
}

export default Board;
