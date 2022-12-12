import { Square } from "./Square";

export function Board(props) {
  const { squares, onClick, winner } = props;
  const renderSquare = (i) => {
    let isSquareWinner = winner?.includes(i);

    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        winner={isSquareWinner}
      />
    );
  };

  return (
    <div>
      {squares.map((squares, i) => {
        if (i === 0 || i === 3 || i === 6) {
          return (
            <div key={i} className="board-row">
              {renderSquare(i)}
              {renderSquare(i + 1)}
              {renderSquare(i + 2)}
            </div>
          );
        }
      })}
    </div>
  );
}
