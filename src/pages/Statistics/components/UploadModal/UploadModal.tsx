import { useTranslation } from "react-i18next";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Match, PracticeMatch, Stats } from "../../../../utils/types";
import styles from "./UploadModal.module.css";
import { useState } from "react";
import { useUploadStats } from "../../../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

interface UploadModalProps {
  open: boolean;
  close: () => void;
}

const UploadModal = ({ open, close }: UploadModalProps) => {
  const { t } = useTranslation();
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [practiceMatches, setPracticeMatches] = useState<PracticeMatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {mutate: uploadToServer, isPending} = useUploadStats(); 

  const uploadJSON = (
    event: React.ChangeEvent<HTMLInputElement>,
    setMatches: (matches: Match[]) => void,
    setPracticeMatches: (practiceMatches: PracticeMatch[]) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data: {matches: Match[], practiceMatches: PracticeMatch[]} = JSON.parse(text);

        setMatches(data.matches || []);
        setPracticeMatches(data.practiceMatches || []);
      } catch (err) {
        console.error("Failed to parse JSON file", err);
      }
    };
    reader.readAsText(file);
  };

  const handleUploadToServer = () => {
    if (!matches || !matches.length || !practiceMatches ||!practiceMatches.length) {
      setError("No stats to upload.");
      return;
    }

    const stats: Stats = {
      matches: matches,
      practiceMatches: practiceMatches
    }

    uploadToServer(stats, {
      onSettled: () => {
        window.location.reload();
      }
    });
  };

  return (
    <Modal open={open} close={close}>
      <div className={styles.uploadModal}>
        <Title text={t("pages.statistics.uploadModal.title")} />
        {
          isPending && <CircularProgress />
        }
        {
          !isPending &&
          <>
              <input
                type="file"
                accept=".json"
                onChange={(e) => uploadJSON(e, setMatches, setPracticeMatches)}
              />
              <div className={styles.buttons}>
              <Button onClick={() => close()} text={t("common.cancel")} />
              <Button
                  onClick={handleUploadToServer}
                  text={t("pages.statistics.uploadModal.upload")}
                  variant={"green"}
              />
              </div>
          </>
        }
      </div>
    </Modal>
  );
};

export default UploadModal;
