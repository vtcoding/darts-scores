import styles from './Statistics.module.css';
import type { Match } from '../../types';
import FadeIn from '../../components/FadeIn/FadeIn';
import General from './components/General/General';
import Matches from './components/Matches/Matches';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import DeleteStatsModal from './components/DeleteStatsModal/DeleteStatsModal';
import PageContent from '../../components/PageContent/PageContent';

const Statistics = () => {
  const [deleteStatsModalVisible, setDeleteStatsModalVisible] = useState<boolean>(false);
  const matches = JSON.parse(localStorage.getItem("matches") || "[]");
  const finishedMatches = matches.filter((match: Match) => match.ended_at)

  const deleteStats = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <FadeIn>
      <PageContent headerTitle={"Statistics"}>
        <General matches={finishedMatches} />
        <Matches matches={finishedMatches} />
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
