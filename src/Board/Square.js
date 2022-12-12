export function Square(props) {
  const { onClick, value, winner } = props;

  return (
    <button
      className={`square ${winner ? "winningSquare" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
