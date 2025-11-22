import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { PracticeTurn } from "../../../../types";
import { calculateDartsHit, calculateHitRate } from "../../../../utils";
import styles from "./PracticeFinishedModal.module.css";

interface PracticeFinishedModalProps {
  open: boolean;
  turns: PracticeTurn[];
  playAgain: () => void;
  quitToMenu: () => void;
}

const PracticeFinishedModal = ({
  open,
  turns,
  playAgain,
  quitToMenu,
}: PracticeFinishedModalProps) => {
  const { t } = useTranslation();
  const activePracticeMatch = localStorage.getItem("activePracticeMatch");
  const storedPracticeMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");

  const savePractice = () => {
    if (activePracticeMatch) {
      const match = JSON.parse(activePracticeMatch);
      match.turns = turns;
      match.ended_at = Date.now();
      storedPracticeMatches.push(match);
      localStorage.setItem("practiceMatches", JSON.stringify(storedPracticeMatches));
      localStorage.removeItem("activePracticeMatch");
    }
  };

  return (
    <Modal open={open}>
      <Title text={t("pages.practiceMatch.practiceFinishedModal.title")} />
      <div className={styles.statsWrapper}>
        <Title text={t("pages.practiceMatch.practiceFinishedModal.statsTitle")} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            {t("pages.practiceMatch.practiceFinishedModal.dartsHit")}: {calculateDartsHit(turns)}
          </div>
          <div className={styles.stat}>
            {t("pages.practiceMatch.practiceFinishedModal.hitRate")}:{" "}
            {calculateHitRate(turns).toFixed(2)}%
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          savePractice();
          playAgain();
        }}
        text={t("pages.practiceMatch.practiceFinishedModal.playAgain")}
        variant={"green"}
      />
      <Button
        onClick={() => {
          savePractice();
          quitToMenu();
        }}
        text={t("pages.practiceMatch.practiceFinishedModal.quit")}
        variant={"red"}
      />
    </Modal>
  );
};

export default PracticeFinishedModal;
