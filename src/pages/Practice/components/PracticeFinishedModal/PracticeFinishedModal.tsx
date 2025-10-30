import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Title from '../../../../components/Title/Title';
import type { PracticeMatch, PracticeTurn } from '../../../../types';
import { calculateDartsHit, calculateHitRate } from '../../../../utils';
import styles from './PracticeFinishedModal.module.css';

interface PracticeFinishedModalProps {
  open: boolean;
  turns: PracticeTurn[];
  playAgain: () => void;
  quitToMenu: () => void;
}

const PracticeFinishedModal = ({
  open,
  turns,
  playAgain,
  quitToMenu,
}: PracticeFinishedModalProps) => {
  const { t } = useTranslation();
  const activePracticeMatch = localStorage.getItem('activePracticeMatch');
  const storedPracticeMatches = JSON.parse(
    localStorage.getItem('practiceMatches') || '[]'
  );

  const savePractice = () => {
    if (activePracticeMatch) {
      const matchId = parseInt(activePracticeMatch);
      const matchIndex = storedPracticeMatches.findIndex(
        (storedMatch: PracticeMatch) => storedMatch.id === matchId
      );
      storedPracticeMatches[matchIndex].turns = turns;
      storedPracticeMatches[matchIndex].ended_at = Date.now();
      localStorage.setItem(
        'practiceMatches',
        JSON.stringify(storedPracticeMatches)
      );
    }
  };

  // Save match when modal is rendered
  useEffect(() => {
    savePractice();
  });

  return (
    <Modal open={open}>
      <Title text={t('pages.practiceMatch.practiceFinishedModal.title')} />
      <div className={styles.statsWrapper}>
        <Title
          text={t('pages.practiceMatch.practiceFinishedModal.statsTitle')}
        />
        <div className={styles.stats}>
          <div className={styles.stat}>
            {t('pages.practiceMatch.practiceFinishedModal.dartsHit')}:{' '}
            {calculateDartsHit(turns)}
          </div>
          <div className={styles.stat}>
            {t('pages.practiceMatch.practiceFinishedModal.hitRate')}:{' '}
            {calculateHitRate(turns).toFixed(2)}%
          </div>
        </div>
      </div>
      <Button
        onClick={playAgain}
        text={t('pages.practiceMatch.practiceFinishedModal.playAgain')}
        variant={'green'}
      />
      <Button
        onClick={quitToMenu}
        text={t('pages.practiceMatch.practiceFinishedModal.quit')}
        variant={'red'}
      />
    </Modal>
  );
};

export default PracticeFinishedModal;
