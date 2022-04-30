type PastMovesProps = {
  totalMoves: number;
  jumpTo: (step: number) => void;
};

export function PastMoves({ totalMoves, jumpTo }: PastMovesProps) {
  const list = [];

  for (let move = 0; move < totalMoves; move++) {
    list.push(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move ? "Go to move #" + move : "Go to game start"}
        </button>
      </li>
    );
  }

  return <ol>{list}</ol>;
}
