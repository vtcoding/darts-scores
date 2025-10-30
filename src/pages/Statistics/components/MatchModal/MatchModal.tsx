import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const turns = match.turns;
    const date = match.ended_at ? formatDate(match.ended_at) : "-";

    return (
        <Modal open={open} close={close}>
            <div className={styles.matchModal}>
                <Title text={`${t("pages.statistics.matchModals.firstTo")} ${match.mode}`} />
                <div className={styles.stats}>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.endedAt")}: {date}</div>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.threeDartAverage")}: {calculateThreeDartAverage(turns).toFixed(2)}</div>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.checkoutPercentage")}: {calculateCheckoutPercentage(turns).toFixed(2)}%</div>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.dartsThrown")}: {turns.length * 3}</div>
                </div>
                <Button onClick={() => { }} text={t("pages.statistics.matchModals.deleteMatch")} variant="red" disabled />
                <Button onClick={close} text={t("pages.statistics.matchModals.close")} />
            </div>
        </Modal>
    )
}

export default MatchModal;