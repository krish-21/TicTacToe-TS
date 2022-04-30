# Tic Tac Toe TypeScript

Project Structure

- src/index.tsx

  - renders root node & <App /> inside root node

- src/App.tsx

  - conditionally renders <PlayGame /> & <Winner /> pages depending on wether there is a winner or not
  - always renders <Scoreboard /> which displays individual scores of players
  - uses cutom hook useTicTacToe() for maintaing entire logic of game

- src/pages/PlayGame.tsx

  - renders <Board /> to display the TictacToe board which in turn renders <Square /> to render buttons to mark symbols
  - renders <PastMoves /> which renders buttons to travel back and forth between different moves

- src/pages/Winner.tsx

  - Displays the Game Winner
  - renders Reset button to reset and start a new Game

- src/hooks/useTicTacToe.tsx

  - houses enties game state and logic
  - maintains stare for history, game board, player turnss, scores, round winner & state winner
  - checks for round winner & game winner; updates state accordingly

- shared (directory)

  - stores type definitions in types.ts
  - stores different interfaces in intefaces directory

- utils/gameStateUtils
  - utility function to initialize empty board state
  - utility function to check if winner / draw exists in current board
