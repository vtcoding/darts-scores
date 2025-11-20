import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import styles from "./DeleteStatsModal.module.css";

interface DeleteStatsModalProps {
  open: boolean;
  close: () => void;
  confirmDeletion: () => void;
}

const DeleteStatsModal = ({ open, close, confirmDeletion }: DeleteStatsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} close={close}>
      <div className={styles.deleteStatsModal}>
        <Title text={t("pages.statistics.deleteStatsModal.title")} />
        <div className={styles.buttons}>
          <Button onClick={() => close()} text={t("pages.statistics.deleteStatsModal.cancel")} />
          <Button
            onClick={() => confirmDeletion()}
            text={t("pages.statistics.deleteStatsModal.delete")}
            variant={"red"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteStatsModal;
