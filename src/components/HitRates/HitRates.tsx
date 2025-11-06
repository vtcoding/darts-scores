import { useTranslation } from "react-i18next";
import type {PracticeMatch } from "../../types";
import { getTotalHitRatesForSector } from "../../utils";
import Block from "../Block/Block";
import Title from "../Title/Title";
import styles from "./HitRates.module.css";

interface HitRatesProps {
    mode: string;
    practiceMatches: PracticeMatch[];
}

const HitRates = ({mode, practiceMatches}: HitRatesProps) => {
    const {t} = useTranslation();
    const filteredMatches = practiceMatches.filter(match => match.mode === mode);
    const finish_on = mode === "around-the-clock" ? 25 : 50;
  
    return (
    <Block>
      <div className={styles.hitRates}>
        <Title text={t("components.hitRates.title")} />
        {
            practiceMatches.length > 0 &&
            <div className={styles.columns}>
                <div className={styles.column}>
                {[...Array(10)].map((_, i) => {
                    return <div className={styles.hitRate}><b>{i+1}</b>: {getTotalHitRatesForSector(filteredMatches, i+1).toFixed(2)}%</div>;
                })}
                </div>
                <div className={styles.column}>
                    {[...Array(10)].map((_, i) => {
                        return <div className={styles.hitRate}><b>{i+11}</b>: {getTotalHitRatesForSector(filteredMatches, i+11).toFixed(2)}%</div>;
                    })}
                    <div className={styles.hitRate}>
                        <b>{finish_on}</b>: {getTotalHitRatesForSector(filteredMatches, finish_on).toFixed(2)}%
                    </div>
                </div>
            </div>
        }
      </div>
    </Block>
  );
};

export default HitRates;
