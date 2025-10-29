
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Title from '../../../../components/Title/Title';
import type { Match, Turn } from '../../../../types';
import { calculateCheckoutPercentage, calculateThreeDartAverage } from '../../../../utils';
import styles from './MatchFinishedModal.module.css';
import { useEffect } from 'react';


interface MatchFinishedModalProps {
    open: boolean;
    turns: Turn[];
    playAgain: () => void;
    quit: () => void;
}

const MatchFinishedModal = ({ open, turns, playAgain, quit }: MatchFinishedModalProps) => {
    const activeMatch = localStorage.getItem("activeMatch");
    const storedMatches = JSON.parse(localStorage.getItem("matches") || "[]");

    const saveMatch = () => {
        if (activeMatch) {
            const matchId = parseInt(activeMatch);
            const matchIndex = storedMatches.findIndex((storedMatch: Match) => storedMatch.id === matchId);
            storedMatches[matchIndex].turns = turns;
            storedMatches[matchIndex].ended_at = Date.now();
            localStorage.setItem("matches", JSON.stringify(storedMatches));
        }
    }

    // Save match when modal is rendered
    useEffect(() => {
        saveMatch()
    });

    return (
        <Modal open={open}>
            <Title text={"Match finished"} />
            <div className={styles.statsWrapper}>
                <Title text={"Stats"} />
                <div className={styles.stats}>
                    <div className={styles.stat}>3 dart average: {calculateThreeDartAverage(turns).toFixed(2)}</div>
                    <div className={styles.stat}>Checkout percentage: {calculateCheckoutPercentage(turns).toFixed(2)}%</div>
                    <div className={styles.stat}>Darts thrown: {turns.length * 3}</div>
                </div>
            </div>
            <Button onClick={() => playAgain()} text={"Play again"} variant={"green"} />
            <Button onClick={() => quit()} text={"Quit"} variant={"red"} />
        </Modal >
    );
};

export default MatchFinishedModal;
