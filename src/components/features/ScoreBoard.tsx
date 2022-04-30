// style imports
import styles from "./ScoreBoard.module.css";

type ScoreBoardProps = {
  xScore: number;
  oScore: number;
};

export function ScoreBoard({ xScore, oScore }: ScoreBoardProps) {
  return (
    <>
      <h3>Score Board</h3>
      <table className={styles.scores}>
        <thead>
          <tr>
            <th>X</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{xScore}</td>
            <td>{oScore}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
