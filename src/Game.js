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
  const gameOn = !winner?.winningUser && !current.squares.includes(null);
  const winnerText = "Winner: " + winner?.winningUser;
  const noWinnerText = !gameOn
    ? "Next player " + (xIsNext ? "X" : "O")
    : "DRAW";
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
    const revMoves = toggle.map((step, i) => {
      const description =
        i < toggle.length - 1
          ? "Go to move #" +
            String(toggle.length - (i + 1)) +
            " at " +
            toggle[i]
          : "Go to game start";
      return (
        <li key={i}>
          <button onClick={() => jumpTo(toggle.length - (i + 1))}>
            {stepNumber === toggle.length - (i + 1) ? (
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

  //toggle set moves, sets to "desc"
  useEffect(() => {
    if (sortDirection === "desc") {
      return;
    }
    setMoves(
      historyState.map((step, i) => {
        const description = i
          ? "Go to move #" + i + " at " + position[i]
          : "Go to game start";
        return (
          <li key={i}>
            <button onClick={() => jumpTo(i)}>
              {stepNumber === i ? <b>{description}</b> : description}
            </button>
          </li>
        );
      })
    );
  }, [sortDirection]);

  //initial set moves (default="asc")
  useEffect(() => {
    if (sortDirection === "desc") {
      let positionCopy = [...position];
      let toggle = positionCopy.reverse();
      const revMoves = toggle.map((step, i) => {
        const description =
          i < toggle.length - 1
            ? "Go to move #" +
              String(toggle.length - (i + 1)) +
              " at " +
              toggle[i]
            : "Go to game start";
        return (
          <li key={i}>
            <button onClick={() => jumpTo(toggle.length - (i + 1))}>
              {stepNumber === toggle.length - (i + 1) ? (
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
      return;
    }

    setMoves(
      historyState.map((step, i) => {
        const description = i
          ? "Go to move #" + i + " at " + position[i]
          : "Go to game start";
        return (
          <li key={i}>
            <button onClick={() => jumpTo(i)}>
              {stepNumber === i ? <b>{description}</b> : description}
            </button>
          </li>
        );
      })
    );
  }, [historyState, stepNumber]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winner={winner?.winningLine}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        <button onClick={handleSort}>↕️</button>
      </div>
    </div>
  );
}
