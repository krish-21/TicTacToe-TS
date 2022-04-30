// type imports
import { SquareValue } from "../../shared/types";

type FinishProps = {
  gameWinner: SquareValue;
  handleResetGame: () => void;
};

export function Winner({ gameWinner, handleResetGame }: FinishProps) {
  return (
    <>
      <h1>Game Winner: {gameWinner}</h1>
      <button onClick={handleResetGame}>RESET GAME</button>
    </>
  );
}
