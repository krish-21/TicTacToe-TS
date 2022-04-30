import { PlayGame } from "./components/pages/PlayGame";
import { useTicTacToe } from "./hooks/useTicTacToe";

export function App() {
  const {
    currentBoard,
    xIsNext,
    totalMoves,
    roundWinner,
    handleClick,
    jumpTo,
    handleCompleteRound,
  } = useTicTacToe();

  return (
    <PlayGame
      totalMoves={totalMoves}
      xIsNext={xIsNext}
      currentBoard={currentBoard}
      roundWinner={roundWinner}
      handleClick={handleClick}
      jumpTo={jumpTo}
      handleCompleteRound={handleCompleteRound}
    />
  );
}
