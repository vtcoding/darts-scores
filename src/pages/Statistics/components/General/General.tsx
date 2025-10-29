import Block from "../../../../components/Block/Block";
import StatsTable from "../../../../components/StatsTable/StatsTable";
import Title from "../../../../components/Title/Title";
import type { Match, Option, PracticeMatch, StatRow } from "../../../../types";
import { calculateBestAndWorstHitRates, calculateTotalCheckoutPercentage, calculateTotalFirstNineDartsAverage, calculateTotalHitRate, calculateTotalThreeDartAverage, getBestAndWorstCheckoutPercentages, getBestAndWorstFirstNineDartsAverages, getBestAndWorsThreeDartAverages } from "../../../../utils";

interface GeneralProps {
    mode: Option;
    matches: Match[];
    practiceMatches: PracticeMatch[];
}

const General = ({ mode, matches, practiceMatches }: GeneralProps) => {
    const totalThreeDartAverage = calculateTotalThreeDartAverage(matches);
    const bestAndWorstAverages = getBestAndWorsThreeDartAverages(matches);
    const totalFirstNineDartsAverage = calculateTotalFirstNineDartsAverage(matches);
    const bestAndWorstFirstNineDartsAverages = getBestAndWorstFirstNineDartsAverages(matches);
    const totalCheckoutPercentage = calculateTotalCheckoutPercentage(matches);
    const bestAndWorstCheckoutPercentages = getBestAndWorstCheckoutPercentages(matches);
    const matchRows: StatRow[] = [
        {
            name: "Three dart average",
            average: { value: totalThreeDartAverage.toFixed(2), unit: "" },
            best: { value: bestAndWorstAverages["best"].toFixed(2), unit: "" },
            worst: { value: bestAndWorstAverages["worst"].toFixed(2), unit: "" },
        },
        {
            name: "First nine darts average",
            average: { value: totalFirstNineDartsAverage.toFixed(2), unit: "" },
            best: { value: bestAndWorstFirstNineDartsAverages["best"].toFixed(2), unit: "" },
            worst: { value: bestAndWorstFirstNineDartsAverages["worst"].toFixed(2), unit: "" },
        },
        {
            name: "Checkout rate",
            average: { value: totalCheckoutPercentage.toFixed(2), unit: "%" },
            best: { value: bestAndWorstCheckoutPercentages["best"].toFixed(2), unit: "%" },
            worst: { value: bestAndWorstCheckoutPercentages["worst"].toFixed(2), unit: "%" },
        },
    ];

    const totalHitRate = calculateTotalHitRate(practiceMatches);
    const bestAndWorstHitRates = calculateBestAndWorstHitRates(practiceMatches);
    const practiceMatchRows: StatRow[] = [
        {
            name: "Total hit rate",
            average: { value: totalHitRate.toFixed(2), unit: "%" },
            best: { value: bestAndWorstHitRates["best"].toFixed(2), unit: "%" },
            worst: { value: bestAndWorstHitRates["worst"].toFixed(2), unit: "%" },
        }
    ];

    const rows = mode.id === "match" ? matchRows : practiceMatchRows;

    return (
        <Block>
            <Title text={"General statistics"} />
            <StatsTable rows={rows} />
        </Block>
    )
}

export default General;
