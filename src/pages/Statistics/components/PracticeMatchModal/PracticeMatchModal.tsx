import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { PracticeMatch } from "../../../../types";
import { calculateHitRate, formatDate } from "../../../../utils";
import styles from "./PracticeMatchModal.module.css";

interface PracticeMatchModalProps {
    open: boolean;
    close: () => void;
    match: PracticeMatch;
    mode: string;
}

const PracticeMatchModal = ({ open, close, match, mode }: PracticeMatchModalProps) => {
    const turns = match.turns;
    const date = match.ended_at ? formatDate(match.ended_at) : "-";

    return (
        <Modal open={open} close={close}>
            <div className={styles.practiceMatchModal}>
                <Title text={`Best of 1 leg - ${mode}`} />
                <div className={styles.stats}>
                    <div className={styles.stat}>Ended at: {date}</div>
                    <div className={styles.stat}>Hit rate: {calculateHitRate(turns).toFixed(2)}</div>
                </div>
                <Button onClick={() => { }} text={"Delete match"} variant="red" disabled />
                <Button onClick={close} text="Close" />
            </div>
        </Modal>
    )
}

export default PracticeMatchModal;