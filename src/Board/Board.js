import { Square } from "./Square";

export function Board(props) {
  const { squares, onClick } = props;

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
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
