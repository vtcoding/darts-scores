import { useState } from "react";

import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Match } from "../../../../utils/types";
import ConfirmDeleteMatchModal from "../ConfirmDeleteMatchModal/ConfirmDeleteMatchModal";
import styles from "./MatchModal.module.css";
import { calculateCheckoutPercentage, calculateThreeDartAverage, formatDate } from "../../../../utils/utils";

interface MatchModalProps {
  open: boolean;
  close: () => void;
  deleteMatch: () => void;
  match: Match;
}

const MatchModal = ({ open, close, deleteMatch, match }: MatchModalProps) => {
  const { t } = useTranslation();
  const [confirmDeleteMatchModalVisible, setConfirmDeleteMatchModalVisible] =
    useState<boolean>(false);
  const turns = match.turns;
  const date = match.ended_at ? formatDate(match.ended_at) : "-";

  return (
    <Modal open={open} close={close}>
      <div className={styles.matchModal}>
        <Title text={`${t("pages.statistics.matchModals.firstTo")} ${match.mode}`} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            {t("pages.statistics.matchModals.endedAt")}: {date}
          </div>
          <div className={styles.stat}>
            {t("pages.statistics.matchModals.threeDartAverage")}:{" "}
            {calculateThreeDartAverage(turns).toFixed(2)}
          </div>
          <div className={styles.stat}>
            {t("pages.statistics.matchModals.checkoutPercentage")}:{" "}
            {calculateCheckoutPercentage(turns).toFixed(2)}%
          </div>
          <div className={styles.stat}>
            {t("pages.statistics.matchModals.dartsThrown")}: {turns.length * 3}
          </div>
        </div>
        <Button
          onClick={() => setConfirmDeleteMatchModalVisible(true)}
          text={t("pages.statistics.matchModals.deleteMatch")}
          variant="red"
        />
        <Button onClick={close} text={t("pages.statistics.matchModals.close")} />
        {confirmDeleteMatchModalVisible && (
          <ConfirmDeleteMatchModal
            open={confirmDeleteMatchModalVisible}
            close={() => setConfirmDeleteMatchModalVisible(false)}
            confirmDelete={() => deleteMatch()}
          />
        )}
      </div>
    </Modal>
  );
};

export default MatchModal;
