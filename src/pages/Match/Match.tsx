import { useState } from "react";
import PageContent from "../../components/PageContent/PageContent";

import styles from "./Match.module.css";

const Match = () => {
  const keys = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className={styles.match}>
      <div className={styles.header}>
        <div className={styles.logoSmall}>DARTS SCORES</div>
        <div className={styles.firstTo}>FIRST TO 1 LEG</div>
        <div className={styles.menu}>MENU</div>
      </div>
      <div className={styles.scoreAndStats}>
        <div className={styles.score}>501</div>
        <div className={styles.stats}>Stats</div>
      </div>
      <div className={styles.controls}>
        <div className={styles.undo}>
          <div className={styles.undoButton}>UNDO</div>
        </div>
        <div className={styles.input}>
          <input placeholder="ENTER A SCORE" />
        </div>
        <div className={styles.submit}>
          <div className={styles.submitButton}>SUBMIT</div>
        </div>
      </div>
      <div className={styles.keyboard}>
        {keys.map((key) => {
          return (
            <div className={styles.key} key={key}>
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Match;
