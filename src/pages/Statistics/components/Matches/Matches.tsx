import { useState } from "react";
import Title from "../../../../components/Title/Title";
import type { Match } from "../../../../types";
import { calculateThreeDartAverage, formatDate } from "../../../../utils";
import styles from "./Matches.module.css";
import MatchModal from "../MatchModal/MatchModal";

interface MatchesProps {
    matches: Match[]
}

const Matches = ({ matches }: MatchesProps) => {
    const [matchModalVisible, setMatchModalVisible] = useState<boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    return (
        <div className={styles.matches}>
            <Title text={"Last 5 matches"} />
            <div className={styles.matchesHeader}>
                <div className={styles.dateHeader}>Ended at</div>
                <div className={styles.averageHeader}>3 dart average</div>
            </div>
            {
                matches.length > 0 &&
                <>
                    {
                        matches.slice(-5).map((match: Match, index: number) => {
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
            {matchModalVisible && selectedMatch && <MatchModal match={selectedMatch} open={matchModalVisible} close={() => setMatchModalVisible(false)} />}
        </div>);
}

export default Matches;