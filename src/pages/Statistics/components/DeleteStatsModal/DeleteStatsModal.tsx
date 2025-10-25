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
    return (
        <Modal open={open}>
            <div className={styles.deleteStatsModal}>
                <Title text={"Are you sure you want to delete your stats?"} />
                <div className={styles.buttons}>
                    <Button onClick={() => close()} text={"Cancel"} />
                    <Button onClick={() => confirmDeletion()} text={"Delete"} variant={"red"} />
                </div>
            </div>

        </Modal>
    )
}

export default DeleteStatsModal;