import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Turn } from "../../../../utils/types";
import styles from "./MatchFinishedModal.module.css";
import { calculateCheckoutPercentage, calculateThreeDartAverage } from "../../../../utils/utils";

interface MatchFinishedModalProps {
  open: boolean;
  turns: Turn[];
  playAgain: () => void;
  quit: () => void;
}

const MatchFinishedModal = ({ open, turns, playAgain, quit }: MatchFinishedModalProps) => {
  const { t } = useTranslation();
  const activeMatch = localStorage.getItem("activeMatch");
  const storedMatches = JSON.parse(localStorage.getItem("matches") || "[]");

  const saveMatch = () => {
    if (activeMatch) {
      const match = JSON.parse(activeMatch);
      match.turns = turns;
      match.ended_at = Date.now();
      storedMatches.push(match);
      localStorage.setItem("matches", JSON.stringify(storedMatches));
      localStorage.removeItem("activeMatch");
    }
  };

  return (
    <Modal open={open}>
      <Title text={t("pages.match.matchFinishedModal.title")} />
      <div className={styles.statsWrapper}>
        <Title text={t("pages.match.matchFinishedModal.stats")} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            {t("pages.match.matchFinishedModal.threeDartAverage")}:{" "}
            {calculateThreeDartAverage(turns).toFixed(2)}
          </div>
          <div className={styles.stat}>
            {t("pages.match.matchFinishedModal.checkoutPercentage")}:{" "}
            {calculateCheckoutPercentage(turns).toFixed(2)}%
          </div>
          <div className={styles.stat}>
            {t("pages.match.matchFinishedModal.dartsThrown")}: {turns.length * 3}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          saveMatch();
          playAgain();
        }}
        text={t("pages.match.matchFinishedModal.playAgain")}
        variant={"green"}
      />
      <Button
        onClick={() => {
          saveMatch();
          quit();
        }}
        text={t("pages.match.matchFinishedModal.quit")}
        variant={"red"}
      />
    </Modal>
  );
};

export default MatchFinishedModal;
