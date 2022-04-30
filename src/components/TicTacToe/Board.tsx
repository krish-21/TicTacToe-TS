// type imports
import { BoardState } from "../../shared/types";

// component imports
import { Square } from "./Square";

// style import
import styles from "./Board.module.css";

type BoardProps = {
  board: BoardState;
  handleClick: (square: number) => void;
};

export function Board({ board, handleClick }: BoardProps) {
  function renderSquare(index: number) {
    return <Square value={board[index]} onClick={() => handleClick(index)} />;
  }

  return (
    <div className={styles.board}>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
