// type imports
import { SquareValue } from "../../shared/types";

// style imports
import styles from "./Square.module.css";

type SquareProps = {
  value: SquareValue;
  onClick: () => void;
};

export function Square({ value, onClick }: SquareProps) {
  return (
    <div className={styles.square}>
      <button onClick={onClick}>{value}</button>
    </div>
  );
}
