// component imports
import { PlayGame } from "./components/pages/PlayGame";
import { Winner } from "./components/pages/Winner";
import { ScoreBoard } from "./components/features/ScoreBoard";

// custom Hook imports
import { useTicTacToe } from "./hooks/useTicTacToe";

export function App() {
  const {
    currentBoard,
    xIsNext,
    totalMoves,
    roundWinner,
    scores,
    gameWinner,
    handleClick,
    jumpTo,
    handleCompleteRound,
    handleResetGame,
  } = useTicTacToe();

  return (
    <>
      {/* Conditinally render the PlayGame or Winner Page */}
      {!gameWinner ? (
        <PlayGame
          totalMoves={totalMoves}
          xIsNext={xIsNext}
          currentBoard={currentBoard}
          roundWinner={roundWinner}
          handleClick={handleClick}
          jumpTo={jumpTo}
          handleCompleteRound={handleCompleteRound}
        />
      ) : (
        <Winner gameWinner={gameWinner} handleResetGame={handleResetGame} />
      )}
      {/* Always Display Score Board */}
      <ScoreBoard xScore={scores.xScore} oScore={scores.oScore} />
    </>
  );
}
