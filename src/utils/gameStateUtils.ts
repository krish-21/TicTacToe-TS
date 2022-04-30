import { SquareValue, BoardState } from "../shared/types";

// function to create initial empty board
export const createInitialBoardState = (): BoardState =>
  new Array<SquareValue>(9).fill(null);

// function to calculate winner or draw
export function calculateWinner(boardState: BoardState): SquareValue | "DRAW" {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }

  if (boardState.every((square) => square !== null)) {
    return "DRAW";
  }

  return null;
}
