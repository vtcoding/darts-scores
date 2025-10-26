import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { Match } from "../../../../types";
import { calculateCheckoutPercentage, calculateThreeDartAverage, formatDate } from "../../../../utils";
import styles from "./MatchModal.module.css";

interface MatchModalProps {
    open: boolean;
    close: () => void;
    match: Match;
}

const MatchModal = ({ open, close, match }: MatchModalProps) => {
    const turns = match.turns;
    const date = match.ended_at ? formatDate(match.ended_at) : "-";

    return (
        <Modal open={open} close={close}>
            <div className={styles.matchModal}>
                <Title text={"Best of 1 leg - 501"} />
                <div className={styles.stats}>
                    <div className={styles.stat}>Ended at: {date}</div>
                    <div className={styles.stat}>3 dart average: {calculateThreeDartAverage(turns).toFixed(2)}</div>
                    <div className={styles.stat}>Checkout percentage: {calculateCheckoutPercentage(turns).toFixed(2)}%</div>
                    <div className={styles.stat}>Darts thrown: {turns.length * 3}</div>
                </div>
                <Button onClick={() => { }} text={"Delete match"} variant="red" disabled />
                <Button onClick={close} text="Close" />
            </div>
        </Modal>
    )
}

export default MatchModal;