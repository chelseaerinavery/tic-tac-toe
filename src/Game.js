import React, { useEffect, useState } from "react";
import "./index.css";
import { calculateWinner } from "./helpers/calculateWinner";
import { positionKey } from "./constants/positionKey";
import { Board } from "./Board/Board";

export function Game(props) {
  const [historyState, setHistoryState] = useState([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [position, setPosition] = useState(["(0,0)"]);
  const [moves, setMoves] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const current = historyState[stepNumber];
  const winner = calculateWinner(current.squares);
  const winnerText = "Winner: " + winner;
  const noWinnerText = "Next player " + (xIsNext ? "X" : "O");
  const status = winner ? winnerText : noWinnerText;

  const handleClick = (i) => {
    const history = historyState.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistoryState(history.concat([{ squares: squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
    setPosition([...position, positionKey[i]]);
  };

  const handleSort = () => {
    if (sortDirection === "desc") {
      setSortDirection("asc");
      return;
    }
    let positionCopy = [...position];
    let toggle = positionCopy.reverse();
    const revMoves = toggle.map((step, move) => {
      const description =
        move < toggle.length - 1
          ? "Go to move #" +
            String(toggle.length - move) +
            " at " +
            toggle[move]
          : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(toggle.length - (move + 1))}>
            {stepNumber === toggle.length - (move + 1) ? (
              <b>{description}</b>
            ) : (
              description
            )}
          </button>
        </li>
      );
    });
    setMoves(revMoves);
    setSortDirection("desc");
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  useEffect(() => {
    if (sortDirection === "desc") {
      return;
    }
    setMoves(
      historyState.map((step, move) => {
        const description = move
          ? "Go to move #" + move + " at " + position[move]
          : "Go to game start";
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>
              {stepNumber === move ? <b>{description}</b> : description}
            </button>
          </li>
        );
      })
    );
  }, [sortDirection]);

  useEffect(() => {
    setMoves(
      historyState.map((step, move) => {
        const description = move
          ? "Go to move #" + move + " at " + position[move]
          : "Go to game start";
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>
              {stepNumber === move ? <b>{description}</b> : description}
            </button>
          </li>
        );
      })
    );
  }, [historyState]);

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        <button onClick={handleSort}>↕️</button>
      </div>
    </div>
  );
}
