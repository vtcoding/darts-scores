import { useState } from "react";
import Title from "../../../../components/Title/Title";
import { type Match, type Option, type PracticeMatch } from "../../../../types";
import { calculateHitRate, calculateThreeDartAverage, formatDate } from "../../../../utils";
import styles from "./Matches.module.css";
import MatchModal from "../MatchModal/MatchModal";
import Block from "../../../../components/Block/Block";
import PracticeMatchModal from "../PracticeMatchModal/PracticeMatchModal";
import { useTranslation } from "react-i18next";

interface MatchesProps {
    mode: Option;
    matches: Match[];
    practiceMatches: PracticeMatch[];
    defaultStat: string;
}

const Matches = ({ mode, matches, practiceMatches, defaultStat }: MatchesProps) => {
    const { t } = useTranslation();
    const [matchModalVisible, setMatchModalVisible] = useState<boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | PracticeMatch | null>(null);

    return (
        <Block>
            <Title text={t("pages.statistics.matches.lastFive")} />
            <div className={styles.matchesHeader}>
                <div className={styles.dateHeader}>{t("pages.statistics.matches.endedAt")}</div>
                <div className={styles.averageHeader}>{defaultStat}</div>
            </div>
            <div className={styles.matches}>
                {
                    mode.id === "match" && matches.length > 0 &&
                    <>
                        {
                            matches.slice(-5).reverse().map((match: Match, index: number) => {
                                const date = match.ended_at ? formatDate(match.ended_at) : "-";
                                return (
                                    <div
                                        onClick={() => {
                                            setSelectedMatch(match)
                                            setMatchModalVisible(true)
                                        }}
                                        key={index}
                                        className={styles.match}
                                    >
                                        <div className={styles.date}>{date}</div>
                                        <div className={styles.average}>{calculateThreeDartAverage(match.turns).toFixed(2)}</div>
                                    </div>
                                )
                            })
                        }
                    </>
                }
                {
                    mode.id !== "match" && practiceMatches.length > 0 &&
                    <>
                        {
                            practiceMatches.slice(-5).reverse().map((match: PracticeMatch, index: number) => {
                                const date = match.ended_at ? formatDate(match.ended_at) : "-";
                                return (
                                    <div
                                        onClick={() => {
                                            setSelectedMatch(match)
                                            setMatchModalVisible(true)
                                        }}
                                        key={index}
                                        className={styles.match}
                                    >
                                        <div className={styles.date}>{date}</div>
                                        <div className={styles.average}>{calculateHitRate(match.turns).toFixed(2)}%</div>
                                    </div>
                                )
                            })
                        }
                    </>
                }

            </div>
            {matchModalVisible && selectedMatch && mode.id === "match" && <MatchModal match={selectedMatch as Match} open={matchModalVisible} close={() => setMatchModalVisible(false)} />}
            {matchModalVisible && selectedMatch && mode.id !== "match" && <PracticeMatchModal mode={mode.name} match={selectedMatch as PracticeMatch} open={matchModalVisible} close={() => setMatchModalVisible(false)} />}
        </Block>);
}

export default Matches;