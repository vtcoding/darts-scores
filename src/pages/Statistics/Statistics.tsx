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

const Statistics = () => {
  const [selectedMode, setSelectedMode] = useState<Option>({ name: "Match", id: "match" });
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
    { name: "Match", id: "match" },
    { name: "Around the clock", id: "around-the-clock" },
    { name: "Doubles practice", id: "doubles" },
    { name: "Triples practice", id: "triples" }
  ]

  return (
    <FadeIn>
      <PageContent headerTitle={"Statistics"}>
        <Block>
          <Title text={"Select mode"} />
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
          defaultStat={selectedMode.id === "match" ? "Three dart average" : "Hit rate"}
        />
        <div className={styles.buttons}>
          <Button
            onClick={() => { }}
            text={"Export stats"}
            variant={"green"}
            disabled
          />
          <Button
            onClick={() => setDeleteStatsModalVisible(true)}
            text={"Delete stats"}
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
