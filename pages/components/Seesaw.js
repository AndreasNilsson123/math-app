import styles from "../../styles/Seesaw.module.css";


function Seesaw({ flip, children }) {
  const rotate = flip ? `${styles.rotate} ${styles[flip]}` : styles.rotate;

  return (
    <div className={styles.seesaw}>
      <div className={rotate}>
        {children}
        <div className={styles.board}/>
      </div>
      <div className={styles.base}/>
    </div>
  );
}

const side = (side) => {
  const sideClass = side === "left" ? styles.leftSide : styles.rightSide;
  return ({ children }) => <div className={`${styles.side} ${sideClass}`}>{children}</div>;
}

Seesaw.Left = side("left");
Seesaw.Right = side("right");

export default Seesaw;