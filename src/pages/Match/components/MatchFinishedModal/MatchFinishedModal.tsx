
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
            <Title text={t("pages.match.matchFinishedModal.title")} />
            <div className={styles.statsWrapper}>
                <Title text={t("pages.match.matchFinishedModal.stats")} />
                <div className={styles.stats}>
                    <div className={styles.stat}>{t("pages.match.matchFinishedModal.threeDartAverage")}: {calculateThreeDartAverage(turns).toFixed(2)}</div>
                    <div className={styles.stat}>{t("pages.match.matchFinishedModal.checkoutPercentage")}: {calculateCheckoutPercentage(turns).toFixed(2)}%</div>
                    <div className={styles.stat}>{t("pages.match.matchFinishedModal.dartsThrown")}: {turns.length * 3}</div>
                </div>
            </div>
            <Button onClick={() => playAgain()} text={t("pages.match.matchFinishedModal.playAgain")} variant={"green"} />
            <Button onClick={() => quit()} text={t("pages.match.matchFinishedModal.quit")} variant={"red"} />
        </Modal >
    );
};

export default MatchFinishedModal;
