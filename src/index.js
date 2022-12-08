import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { positionKey } from "./constants/positionKey";

function Square(props) {
  const {onClick, value} = props;
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.squares.map((squares, i) => {
          if (i === 0 || i === 3 || i === 6) {
            return (
              <div key={i} className="board-row">
                {this.renderSquare(i)}
                {this.renderSquare(i + 1)}
                {this.renderSquare(i + 2)}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

function Game(props) {
    const [historyState, setHistoryState] = useState([{squares: Array(9).fill(null)}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [position, setPosition] = useState([]);

  const handleClick = (i) => {
    const history = historyState.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    
  setHistoryState(history.concat([{squares:squares}]))
  setStepNumber(history.length)
  setXIsNext(!xIsNext)
  setPosition([...position, positionKey[i]])
  }

  const handleSort = () => {
    let sortedHistory = [...historyState];
    setHistoryState(sortedHistory.reverse())s
    //default to asc, toggle to desc
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move
        ? "Go to move #" + move + " at " + this.state.position[move - 1]
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {this.state.stepNumber === move ? (
              <b>{description}</b>
            ) : (
              description
            )}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
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
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
