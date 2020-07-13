import React from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="center">
      <h1>Five in a row</h1>
      <Board num={13} size={40} />
    </div>
  );
}

export default App;
