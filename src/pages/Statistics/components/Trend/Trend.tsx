import { useState } from "react";

import { useTranslation } from "react-i18next";

import Block from "../../../../components/Block/Block";
import BlockParagraph from "../../../../components/BlockParagraph/BlockParagraph";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import Title from "../../../../components/Title/Title";
import TrendChart from "../../../../components/TrendChart/TrendChart";
import type { ChartDataItem, Frequency, Match, PracticeMatch } from "../../../../utils/types";
import "../../../../utils/utils";
import { getMatchStatistics, getPracticeMatchStatistics } from "../../../../utils/utils";
import styles from "./Trend.module.css";

interface TrendProps {
  mode: string;
  matches: Match[];
  practiceMatches: PracticeMatch[];
}

const Trend = ({ mode, matches, practiceMatches }: TrendProps) => {
  const { t } = useTranslation();
  const [selectedGeneralStatistic, setSelectedGeneralStatistic] =
    useState<string>("threeDartAverage");
  const [selectedPracticeStatistic, setSelectedPracticeStatistic] = useState<string>("hitRate");
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("weekly");

  const matchStatistics = getMatchStatistics(matches, selectedFrequency);
  const practiceMatchStatistics = getPracticeMatchStatistics(practiceMatches, selectedFrequency);

  const finalizedMatchStatistics = () => {
    if (selectedGeneralStatistic === "threeDartAverage") {
      return matchStatistics.map((item) => {
        return { label: item.label, value: item.threeDartAverage.toFixed(2) } as ChartDataItem;
      });
    } else if (selectedGeneralStatistic === "firstNineDartAverage") {
      return matchStatistics.map((item) => {
        return { label: item.label, value: item.firstNineDartAverage.toFixed(2) } as ChartDataItem;
      });
    } else if (selectedGeneralStatistic === "checkoutPercentage") {
      return matchStatistics.map((item) => {
        return {
          label: item.label,
          value: item.checkoutPercentage.toFixed(2),
        } as ChartDataItem;
      });
    } else {
      return [];
    }
  };

  const finalizedPracticeMatchStatistics = () => {
    if (selectedPracticeStatistic === "hitRate") {
      return practiceMatchStatistics.map((item) => {
        return { label: item.label, value: item.hitRate.toFixed(2) } as ChartDataItem;
      });
    } else {
      return [];
    }
  };

  const yLabels = () => {
    if (mode == "match") {
      if (
        selectedGeneralStatistic === "threeDartAverage" ||
        selectedGeneralStatistic === "firstNineDartAverage"
      ) {
        return [0, 30, 60, 90, 120, 150, 180];
      }
    }
    return [0, 20, 40, 60, 80, 100];
  };

  const statisticTypes = [
    { name: t("common.threeDartAverage"), id: "threeDartAverage" },
    { name: t("common.firstNineDartAverage"), id: "firstNineDartAverage" },
    { name: t("common.checkoutPercentage"), id: "checkoutPercentage" },
  ];

  const frequencyTypes = [
    { name: t("pages.statistics.trend.daily"), id: "daily" },
    { name: t("pages.statistics.trend.weekly"), id: "weekly" },
    { name: t("pages.statistics.trend.monthly"), id: "monthly" },
    { name: t("pages.statistics.trend.yearly"), id: "yearly" },
  ];

  return (
    <Block>
      <Title text={t("pages.statistics.trend.title")} />
      <div className={styles.dropdowns}>
        <div className={styles.dropdown}>
          <BlockParagraph>{t("pages.statistics.trend.selectStatistic")}</BlockParagraph>
          {mode === "match" && (
            <Dropdown
              selectedOption={selectedGeneralStatistic}
              setSelectedOption={setSelectedGeneralStatistic}
              options={statisticTypes}
            />
          )}
          {mode !== "match" && (
            <Dropdown
              selectedOption={selectedPracticeStatistic}
              setSelectedOption={setSelectedPracticeStatistic}
              options={[{ name: t("common.hitRate"), id: "hitRate" }]}
            />
          )}
        </div>
        <div className={styles.dropdown}>
          <BlockParagraph>{t("pages.statistics.trend.selectFrequency")}</BlockParagraph>
          <Dropdown
            selectedOption={selectedFrequency}
            setSelectedOption={(frequency) => setSelectedFrequency(frequency as Frequency)}
            options={frequencyTypes}
          />
        </div>
      </div>
      <TrendChart
        data={
          mode === "match"
            ? finalizedMatchStatistics().slice(-7)
            : finalizedPracticeMatchStatistics().slice(-7)
        }
        statistic={selectedGeneralStatistic}
        yLabels={yLabels()}
      />
    </Block>
  );
};

export default Trend;
