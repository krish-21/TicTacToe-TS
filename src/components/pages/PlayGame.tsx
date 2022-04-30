// type imports
import { BoardState, SquareValue } from "../../shared/types";

// component imports
import { Board } from "../TicTacToe/Board";
import { PastMoves } from "../features/PastMoves";

// style import
import styles from "./PlayGame.module.css";

type PlayGameProps = {
  currentBoard: BoardState;
  xIsNext: boolean;
  totalMoves: number;
  roundWinner: SquareValue | "DRAW";
  handleClick: (square: number) => void;
  jumpTo: (stepnumber: number) => void;
  handleCompleteRound: () => void;
};

export function PlayGame({
  currentBoard,
  xIsNext,
  totalMoves,
  roundWinner,
  handleClick,
  jumpTo,
  handleCompleteRound,
}: PlayGameProps) {
  return (
    <div className={styles["game-row"]}>
      <div className={styles["game-column"]}>
        <h3>
          {roundWinner
            ? `Winner: ${roundWinner}`
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </h3>
        <Board board={currentBoard} handleClick={handleClick} />
      </div>
      <PastMoves totalMoves={totalMoves} jumpTo={jumpTo} />
      {roundWinner && (
        <button
          className={styles["complete-button"]}
          onClick={handleCompleteRound}
        >
          Complete Round
        </button>
      )}
    </div>
  );
}
