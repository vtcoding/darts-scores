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
        <div className={styles.general}>
            <Title text={"General"} />
            <table>
                <tr>
                    <th></th>
                    <th>Avg</th>
                    <th>Best</th>
                    <th>Worst</th>
                </tr>
                <tr>
                    <td>3 dart average</td>
                    <td>{totalThreeDartAverage.toFixed(2)}</td>
                    <td>{bestAndWorstAverages["best"].toFixed(2)}</td>
                    <td>{bestAndWorstAverages["worst"].toFixed(2)}</td>
                </tr>
                <tr>
                    <td>First 9 darts</td>
                    <td>{totalFirstNineDartsAverage.toFixed(2)}</td>
                    <td>{bestAndWorstFirstNineDartsAverages["best"].toFixed(2)}</td>
                    <td>{bestAndWorstFirstNineDartsAverages["worst"].toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Checkout rate</td>
                    <td>{totalCheckoutPercentage.toFixed(2)}%</td>
                    <td>{bestAndWorstCheckoutPercentages["best"].toFixed(2)}%</td>
                    <td>{bestAndWorstCheckoutPercentages["worst"].toFixed(2)}%</td>
                </tr>
            </table>
        </div>
    )
}

export default General;