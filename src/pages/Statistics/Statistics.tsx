import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import FadeIn from "../../components/FadeIn/FadeIn";
import HitRates from "../../components/HitRates/HitRates";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import type { Match, Option, PracticeMatch } from "../../utils/types";
import styles from "./Statistics.module.css";
import DeleteStatsModal from "./components/DeleteStatsModal/DeleteStatsModal";
import General from "./components/General/General";
import Matches from "./components/Matches/Matches";
import { useMatches } from "../../utils/api";
import DownloadModal from "./components/DownloadModal/DownloadModal";

const Statistics = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "match");
  const [downloadModalVisible, setDownloadModalVisible] = useState<boolean>(false);
  const [deleteStatsModalVisible, setDeleteStatsModalVisible] = useState<boolean>(false);
  const { data: matches, isLoading, isError, error } = useMatches();
  const practiceMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");
  const filteredPracticeMatches = practiceMatches.filter(
    (match: PracticeMatch) => match.mode === mode
  );
  const finishedPracticeMatches = filteredPracticeMatches.filter(
    (match: PracticeMatch) => match.ended_at
  );

  const deleteStats = () => {
    localStorage.removeItem("matches");
    localStorage.removeItem("practiceMatches");
    localStorage.removeItem("activeMatch");
    localStorage.removeItem("activePracticeMatch");
    window.location.reload();
  };

  const modes = [
    { name: t("pages.statistics.modeMatch"), id: "match" },
    { name: t("pages.statistics.modeAroundTheClock"), id: "around-the-clock" },
    { name: t("pages.statistics.modeDoublesPractice"), id: "doubles" },
    { name: t("pages.statistics.modeTriplesPractice"), id: "triples" },
  ];

  useEffect(() => {
    setSearchParams({ mode: mode });
  }, [mode]);

  return (
    <FadeIn>
      <PageContent headerTitle={t("pages.statistics.title")}>
        <Block>
          <Title text={t("pages.statistics.selectMode")} />
          <Dropdown options={modes} selectedOption={mode} setSelectedOption={setMode} />
        </Block>
        {
          isLoading && <CircularProgress />
        }
        {
          !isLoading && matches &&
          <>
            <General mode={mode} matches={matches} practiceMatches={finishedPracticeMatches} />
            {mode !== "match" && <HitRates mode={mode} practiceMatches={finishedPracticeMatches} />}
            <Matches
              mode={modes.find((m) => m.id === mode) as Option}
              matches={matches}
              practiceMatches={finishedPracticeMatches}
              defaultStat={
                mode === "match"
                  ? t("pages.statistics.defaultStatMatch")
                  : t("pages.statistics.defaultStatPractice")
              }
            />
            <div className={styles.buttons}>
              <Button
                onClick={() => {}}
                text={t("pages.statistics.exportStatsButton")}
                variant={"green"}
                disabled
              />
              <Button
                onClick={() => setDeleteStatsModalVisible(true)}
                text={t("pages.statistics.deleteStatsButton")}
                variant={"red"}
              />
            </div>
            {downloadModalVisible && (
              <DownloadModal
                open={downloadModalVisible}
                close={() => setDownloadModalVisible(false)}
                matches={matches}
              />
            )}
            {deleteStatsModalVisible && (
              <DeleteStatsModal
                open={deleteStatsModalVisible}
                confirmDeletion={() => deleteStats()}
                close={() => setDeleteStatsModalVisible(false)}
              />
            )}
          </>
        }
      </PageContent>
    </FadeIn>
  );
};

export default Statistics;
