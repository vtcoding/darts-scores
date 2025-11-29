import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Match, PracticeMatch } from "../../../../utils/types";
import styles from "./DownloadModal.module.css";

interface DownloadModalProps {
  open: boolean;
  close: () => void;
  matches: Match[];
  practiceMatches: PracticeMatch[];
}

const DownloadModal = ({ open, close, matches, practiceMatches }: DownloadModalProps) => {
  const { t } = useTranslation();

  const handleDownload = (matches: Match[], practiceMatches: PracticeMatch[]) => {
    const data: {matches: Match[], practiceMatches: PracticeMatch[]} = { matches, practiceMatches };
    const jsonStr = JSON.stringify(data, null, 2); // pretty print optional

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "matches_export.json";
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
            onClick={() => handleDownload(matches, practiceMatches)}
            text={t("pages.statistics.exportModal.download")}
            variant={"green"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
