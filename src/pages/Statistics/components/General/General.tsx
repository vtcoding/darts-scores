import Block from "../../../../components/Block/Block";
import Title from "../../../../components/Title/Title";
import type { Match } from "../../../../types";
import { calculateTotalCheckoutPercentage, calculateTotalFirstNineDartsAverage, calculateTotalThreeDartAverage, getBestAndWorstCheckoutPercentages, getBestAndWorstFirstNineDartsAverages, getBestAndWorsThreeDartAverages } from "../../../../utils";
import styles from "./General.module.css";

interface GeneralProps {
    matches: Match[];
}

const General = ({ matches }: GeneralProps) => {
    const totalThreeDartAverage = calculateTotalThreeDartAverage(matches);
    const bestAndWorstAverages = getBestAndWorsThreeDartAverages(matches);
    const totalFirstNineDartsAverage = calculateTotalFirstNineDartsAverage(matches);
    const bestAndWorstFirstNineDartsAverages = getBestAndWorstFirstNineDartsAverages(matches);
    const totalCheckoutPercentage = calculateTotalCheckoutPercentage(matches);
    const bestAndWorstCheckoutPercentages = getBestAndWorstCheckoutPercentages(matches);

    return (
        <Block>
            <Title text={"General statistics"} />
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th className={styles.th}></th>
                    <th className={styles.th}>Avg</th>
                    <th className={styles.th}>Best</th>
                    <th className={styles.th}>Worst</th>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>3 dart average</td>
                    <td className={styles.td}>{totalThreeDartAverage.toFixed(2)}</td>
                    <td className={styles.td}>{bestAndWorstAverages["best"].toFixed(2)}</td>
                    <td className={styles.td}>{bestAndWorstAverages["worst"].toFixed(2)}</td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>First 9 darts</td>
                    <td className={styles.td}>{totalFirstNineDartsAverage.toFixed(2)}</td>
                    <td className={styles.td}>{bestAndWorstFirstNineDartsAverages["best"].toFixed(2)}</td>
                    <td className={styles.td}>{bestAndWorstFirstNineDartsAverages["worst"].toFixed(2)}</td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>Checkout rate</td>
                    <td className={styles.td}>{totalCheckoutPercentage.toFixed(2)}%</td>
                    <td className={styles.td}>{bestAndWorstCheckoutPercentages["best"].toFixed(2)}%</td>
                    <td className={styles.td}>{bestAndWorstCheckoutPercentages["worst"].toFixed(2)}%</td>
                </tr>
            </table>
        </Block>
    )
}

export default General;