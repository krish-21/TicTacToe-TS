import { BoardState } from "../types";

// State of an entire Round in a Game
export interface RoundState {
  currentBoard: BoardState;
  stepNumber: number;
  xIsNext: boolean;
}
