import styles from './Statistics.module.css';
import type { Option, Match, PracticeMatch } from '../../types';
import FadeIn from '../../components/FadeIn/FadeIn';
import General from './components/General/General';
import Matches from './components/Matches/Matches';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import DeleteStatsModal from './components/DeleteStatsModal/DeleteStatsModal';
import PageContent from '../../components/PageContent/PageContent';
import Dropdown from '../../components/Dropdown/Dropdown';
import Block from '../../components/Block/Block';
import Title from '../../components/Title/Title';
import { useTranslation } from 'react-i18next';

const Statistics = () => {
  const { t } = useTranslation();
  const [selectedMode, setSelectedMode] = useState<Option>({ name: t("pages.statistics.modeMatch"), id: "match" });
  const [deleteStatsModalVisible, setDeleteStatsModalVisible] = useState<boolean>(false);
  const matches = JSON.parse(localStorage.getItem("matches") || "[]");
  const finishedMatches = matches.filter((match: Match) => match.ended_at);
  const practiceMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");
  const filteredPracticeMatches = practiceMatches.filter((match: PracticeMatch) => match.mode === selectedMode.id);
  const finishedPracticeMatches = filteredPracticeMatches.filter((match: PracticeMatch) => match.ended_at);

  const deleteStats = () => {
    localStorage.clear();
    window.location.reload();
  }

  const modes = [
    { name: t("pages.statistics.modeMatch"), id: "match" },
    { name: t("pages.statistics.modeAroundTheClock"), id: "around-the-clock" },
    { name: t("pages.statistics.modeDoublesPractice"), id: "doubles" },
    { name: t("pages.statistics.modeTriplesPractice"), id: "triples" }
  ]

  return (
    <FadeIn>
      <PageContent headerTitle={t("pages.statistics.title")}>
        <Block>
          <Title text={t("pages.statistics.selectMode")} />
          <Dropdown options={modes} selectedOption={selectedMode} setSelectedOption={setSelectedMode} />
        </Block>
        <General
          mode={selectedMode}
          matches={finishedMatches}
          practiceMatches={finishedPracticeMatches}
        />
        <Matches
          mode={selectedMode}
          matches={finishedMatches}
          practiceMatches={finishedPracticeMatches}
          defaultStat={selectedMode.id === "match" ? t("pages.statistics.defaultStatMatch") : t("pages.statistics.defaultStatPractice")}
        />
        <div className={styles.buttons}>
          <Button
            onClick={() => { }}
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
        {
          deleteStatsModalVisible &&
          <DeleteStatsModal
            open={deleteStatsModalVisible}
            confirmDeletion={() => deleteStats()}
            close={() => setDeleteStatsModalVisible(false)}
          />
        }
      </PageContent>
    </FadeIn >
  );
};

export default Statistics;

