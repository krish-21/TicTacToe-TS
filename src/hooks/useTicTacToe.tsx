// react imports
import { useState, useEffect } from "react";

// type imports
import { SquareValue, BoardState } from "../shared/types";

// interface imports
import { RoundState } from "../shared/interfaces/RoundState.interface";
import { GameScore } from "../shared/interfaces/GameScore.interface";

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
  scores: GameScore;
  gameWinner: SquareValue;
  handleClick: (square: number) => void;
  jumpTo: (stepNumber: number) => void;
  handleCompleteRound: () => void;
  handleResetGame: () => void;
};

// Custom Hook function to play TicTacToe
export const useTicTacToe = (): HookReturnValue => {
  // state to store round history
  const [roundHistory, setRoundHistory] = useState<BoardState[]>([
    createInitialBoardState(),
  ]);

  // state to store round data
  const [roundState, setRoundState] = useState<RoundState>({
    currentBoard: createInitialBoardState(),
    stepNumber: 0,
    xIsNext: true,
  });

  // state to store current round winner
  const [roundWinner, setRoundWinner] = useState<SquareValue | "DRAW">(null);

  // state to store player who started last
  const [lastStarted, setLastStarted] = useState<SquareValue>("X");

  // state to store over all game winner
  const [gameWinner, setGameWinner] = useState<SquareValue>(null);

  // state to store scores
  const [scores, setScores] = useState<GameScore>({
    xScore: 0,
    oScore: 0,
  });

  // side effect to check winner
  useEffect(
    () => {
      // Game Winner exists
      if (scores.xScore > 1 || scores.oScore > 1) {
        if (Math.abs(scores.xScore - scores.oScore) > 0) {
          setGameWinner(scores.xScore - scores.oScore > 0 ? "X" : "O");
          return;
        }
      }

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
    // run effect if currentBoard changes, winner or scores
    [roundState.currentBoard, roundWinner, scores]
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
    const newBoardState = roundState.currentBoard.slice();

    // mark appropriately
    newBoardState[square] = roundState.xIsNext ? "X" : "O";

    // update new history
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
    // update scores appropriately
    if (roundWinner) {
      if (roundWinner === "X") {
        setScores({
          xScore: scores.xScore + 1,
          oScore: scores.oScore,
        });
      } else if (roundWinner === "O") {
        setScores({
          xScore: scores.xScore,
          oScore: scores.oScore + 1,
        });
      }
    }

    // boolean to indicate if X is next
    let nextIsX;

    // if winner exists, winner starts
    if (roundWinner === "X" || roundWinner === "O") {
      nextIsX = roundWinner === "X";
    }
    // else, last started player who didn't start starts
    else {
      lastStarted === "X" ? (nextIsX = false) : (nextIsX = true);
    }

    // set last started
    setLastStarted(nextIsX ? "X" : "O");

    // reset round state
    setRoundState({
      currentBoard: createInitialBoardState(),
      stepNumber: 0,
      xIsNext: nextIsX,
    });

    // reset history
    setRoundHistory([createInitialBoardState()]);

    // reset winner
    setRoundWinner(null);
  }

  // function to completely reset the game
  function handleResetGame() {
    // reset entire hook state
    setRoundState({
      currentBoard: createInitialBoardState(),
      stepNumber: 0,
      xIsNext: true,
    });
    setRoundHistory([createInitialBoardState()]);
    setRoundWinner(null);
    setLastStarted(null);
    setGameWinner(null);
    setScores({
      xScore: 0,
      oScore: 0,
    });
  }

  return {
    currentBoard: roundState.currentBoard,
    xIsNext: roundState.xIsNext,
    totalMoves: roundHistory.length,
    roundWinner,
    scores,
    gameWinner,
    handleClick,
    jumpTo,
    handleCompleteRound,
    handleResetGame,
  };
};
