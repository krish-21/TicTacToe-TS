// react imports
import { useState, useEffect } from "react";

// type imports
import { SquareValue, BoardState } from "../shared/types";

// interface imports
import { RoundState } from "../shared/interfaces/RoundState.interface";

// util functions
import {
  createInitialBoardState,
  calculateWinner,
} from "../utils/gameStateUtils";

type HookReturnValue = {
  currentBoard: BoardState;
  xIsNext: boolean;
  totalMoves: number;
  roundWinner: SquareValue | "DRAW";
  handleClick: (square: number) => void;
  jumpTo: (stepNumber: number) => void;
  handleCompleteRound: () => void;
};

// Custom Hook function to play TicTacToe
export const useTicTacToe = (): HookReturnValue => {
  // state to store Round history
  const [roundHistory, setRoundHistory] = useState<BoardState[]>([
    createInitialBoardState(),
  ]);

  //
  const [roundState, setRoundState] = useState<RoundState>({
    currentBoard: createInitialBoardState(),
    stepNumber: 0,
    xIsNext: true,
  });

  // state to store current round winner
  const [roundWinner, setRoundWinner] = useState<SquareValue | "DRAW">(null);

  // side effect to check winner
  useEffect(
    () => {
      // Round Winner exists
      if (roundWinner) {
        return;
      }

      // calculate the round winner
      const currentWinner = calculateWinner(roundState.currentBoard);

      // set winner if winner exists
      if (currentWinner) {
        setRoundWinner(currentWinner);
      }
    },
    // run effect if currentBoard changes, winner
    [roundState.currentBoard, roundWinner]
  );

  // function to handle click of each square
  function handleClick(square: number): void {
    // if winner exists, return
    if (roundWinner) {
      return;
    }

    // load game history upto current step
    const newRoundHistory = roundHistory.slice(0, roundState.stepNumber + 1);

    if (roundState.currentBoard[square]) {
      return;
    }

    // create a copy of current board state
    // const newBoardState = boardState.slice();
    const newBoardState = roundState.currentBoard.slice();

    // mark appropriately
    newBoardState[square] = roundState.xIsNext ? "X" : "O";

    // updaye new history
    newRoundHistory.push(newBoardState);

    // set updated round state
    setRoundState({
      stepNumber: newRoundHistory.length - 1,
      currentBoard: newBoardState,
      xIsNext: !roundState.xIsNext,
    });

    setRoundHistory(newRoundHistory);
  }

  // function to handle jumps to specific steps
  function jumpTo(stepNumber: number): void {
    // change round state to point in history
    setRoundState({
      currentBoard: roundHistory[stepNumber],
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });

    // reset winner
    setRoundWinner(null);
  }

  // function to complete current round after winner is declared
  function handleCompleteRound(): void {
    // reset round state
    setRoundState({
      currentBoard: createInitialBoardState(),
      stepNumber: 0,
      xIsNext: true,
    });

    // reset winner
    setRoundWinner(null);
  }

  return {
    currentBoard: roundState.currentBoard,
    xIsNext: roundState.xIsNext,
    totalMoves: roundHistory.length,
    roundWinner,
    handleClick,
    jumpTo,
    handleCompleteRound,
  };
};
