import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const turns = match.turns;
    const date = match.ended_at ? formatDate(match.ended_at) : "-";

    return (
        <Modal open={open} close={close}>
            <div className={styles.practiceMatchModal}>
                <Title text={mode} />
                <div className={styles.stats}>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.endedAt")}: {date}</div>
                    <div className={styles.stat}>{t("pages.statistics.matchModals.hitRate")}: {calculateHitRate(turns).toFixed(2)}%</div>
                </div>
                <Button onClick={() => { }} text={t("pages.statistics.matchModals.deleteMatch")} variant="red" disabled />
                <Button onClick={close} text={t("pages.statistics.matchModals.close")} />
            </div>
        </Modal>
    )
}

export default PracticeMatchModal;