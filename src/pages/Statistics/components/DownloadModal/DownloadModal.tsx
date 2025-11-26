import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Match } from "../../../../utils/types";
import styles from "./DownloadModal.module.css";
import Papa from 'papaparse';

interface DownloadModalProps {
  open: boolean;
  close: () => void;
  matches: Match[];
}

const DownloadModal = ({ open, close, matches }: DownloadModalProps) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    // Build one row per match
    const rows = matches.map((match: Match) => ({
      id: match.id,
      mode: match.mode,
      legs: match.legs,
      started_at: match.started_at,
      ended_at: match.ended_at,
      turns: JSON.stringify(match.turns), // <-- turns in a single column
    }));

    const csv = Papa.unparse(rows);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "matches.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal open={open} close={close}>
      <div className={styles.downloadModal}>
        <Title text={t("pages.statistics.exportModal.title")} />
        <div className={styles.buttons}>
          <Button onClick={() => close()} text={t("common.cancel")} />
          <Button
            onClick={handleDownload}
            text={t("pages.statitics.exportModal.download")}
            variant={"green"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
