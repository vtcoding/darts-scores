import { useTranslation } from "react-i18next";

import Block from "../../../../components/Block/Block";
import Title from "../../../../components/Title/Title";
import type { Match, PracticeMatch, StatRow } from "../../../../utils/types";
import {
  calculateTotalCheckoutPercentage,
  calculateTotalFirstNineDartsAverage,
  calculateTotalHitRate,
  calculateTotalThreeDartAverage,
  getBestAndWorsThreeDartAverages,
  getBestAndWorstCheckoutPercentages,
  getBestAndWorstFirstNineDartsAverages,
  getBestAndWorstHitRates,
} from "../../../../utils/utils";
import StatsTable from "../StatsTable/StatsTable";

interface GeneralProps {
  mode: string;
  matches: Match[];
  practiceMatches: PracticeMatch[];
}

const General = ({ mode, matches, practiceMatches }: GeneralProps) => {
  const { t } = useTranslation();
  const totalThreeDartAverage = calculateTotalThreeDartAverage(matches);
  const bestAndWorstAverages = getBestAndWorsThreeDartAverages(matches);
  const totalFirstNineDartsAverage = calculateTotalFirstNineDartsAverage(matches);
  const bestAndWorstFirstNineDartsAverages = getBestAndWorstFirstNineDartsAverages(matches);
  const totalCheckoutPercentage = calculateTotalCheckoutPercentage(matches);
  const bestAndWorstCheckoutPercentages = getBestAndWorstCheckoutPercentages(matches);
  const matchRows: StatRow[] = [
    {
      name: t("pages.statistics.general.threeDartAverage"),
      average: { value: totalThreeDartAverage.toFixed(2), unit: "" },
      best: { value: bestAndWorstAverages["best"].toFixed(2), unit: "" },
      worst: { value: bestAndWorstAverages["worst"].toFixed(2), unit: "" },
    },
    {
      name: t("pages.statistics.general.firstNineDartsAverage"),
      average: { value: totalFirstNineDartsAverage.toFixed(2), unit: "" },
      best: {
        value: bestAndWorstFirstNineDartsAverages["best"].toFixed(2),
        unit: "",
      },
      worst: {
        value: bestAndWorstFirstNineDartsAverages["worst"].toFixed(2),
        unit: "",
      },
    },
    {
      name: t("pages.statistics.general.checkoutPercentage"),
      average: { value: totalCheckoutPercentage.toFixed(2), unit: "%" },
      best: {
        value: bestAndWorstCheckoutPercentages["best"].toFixed(2),
        unit: "%",
      },
      worst: {
        value: bestAndWorstCheckoutPercentages["worst"].toFixed(2),
        unit: "%",
      },
    },
  ];

  const totalHitRate = calculateTotalHitRate(practiceMatches);
  const bestAndWorstHitRates = getBestAndWorstHitRates(practiceMatches);
  const practiceMatchRows: StatRow[] = [
    {
      name: t("pages.statistics.general.totalHitRate"),
      average: { value: totalHitRate.toFixed(2), unit: "%" },
      best: { value: bestAndWorstHitRates["best"].toFixed(2), unit: "%" },
      worst: { value: bestAndWorstHitRates["worst"].toFixed(2), unit: "%" },
    },
  ];

  const rows = mode === "match" ? matchRows : practiceMatchRows;

  return (
    <Block>
      <Title text={t("pages.statistics.general.title")} />
      <StatsTable rows={rows} />
    </Block>
  );
};

export default General;
