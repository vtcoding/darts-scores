import { useTranslation } from "react-i18next";

import type { PracticeMatch } from "../../utils/types";
import { getSectorRates, sortSectors } from "../../utils/utils";
import Block from "../Block/Block";
import Title from "../Title/Title";
import styles from "./HitRates.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import BlockParagraph from "../BlockParagraph/BlockParagraph";

interface HitRatesProps {
  mode: string;
  practiceMatches: PracticeMatch[];
}

const HitRates = ({ mode, practiceMatches }: HitRatesProps) => {
  const { t } = useTranslation();
  const [selectedOrder, setSelectedOrder] = useState<"sector" | "rate">("sector");
  const [selectedSort, setSelectedSort] = useState<"asc" | "desc">("asc");
  const filteredMatches = practiceMatches.filter((match) => match.mode === mode);
  const finish_on = mode === "around-the-clock" ? 25 : 50;

  const sectors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, finish_on];
  const sectorRates = getSectorRates(filteredMatches, sectors);
  const sortedSectorRates = sortSectors(sectorRates, selectedOrder, selectedSort);
  
  const orderOptions = [
    {
      name: "Sector",
      id: "sector"  
    },
    {
      name: "Hit rate",
      id: "rate"
    }
  ];

  const sortOptions = [
    {
      name: "Ascending",
      id: "asc"  
    },
    {
      name: "Descending",
      id: "desc"
    }
  ]

  return (
    <Block>
      <div className={styles.hitRates}>
        <Title text={t("components.hitRates.title")} />
        <div className={styles.options}>
          <div className={styles.orderBy}>
            <BlockParagraph>
              Order by:
            </BlockParagraph>
            <Dropdown options={orderOptions} selectedOption={selectedOrder} setSelectedOption={(option) => setSelectedOrder(option as "sector" | "rate")}/>
          </div>
          <div className={styles.sortBy}>
            <BlockParagraph>
              Sort by:
            </BlockParagraph>
            <Dropdown options={sortOptions} selectedOption={selectedSort} setSelectedOption={(option) => setSelectedSort(option as "asc" | "desc")}/>
          </div>
        </div>
        {practiceMatches.length > 0 && (
          <div className={styles.columns}>
            <div className={styles.column}>
              {sortedSectorRates.slice(0, 10).map((sector) => {
                return (
                  <div className={styles.hitRate}>
                    <b>{sector.sector}</b>: {sector.rate.toFixed(2)}%
                  </div>
                );
              })}
            </div>
            <div className={styles.column}>
              {sortedSectorRates.slice(-11).map((sector) => {
                return (
                  <div className={styles.hitRate}>
                    <b>{sector.sector}</b>: {sector.rate.toFixed(2)}%
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Block>
  );
};

export default HitRates;
