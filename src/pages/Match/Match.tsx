import { useState } from 'react';
import styles from './Match.module.css';
import type { Turn } from '../../types';
import { calculateRemainingScore, calculateThreeDartAverage, saveNewMatchToStorage } from '../../utils';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import DoublesModal from './components/DoublesModal/DoublesModal';
import MatchFinishedModal from './components/MatchFinishedModal/MatchFinishedModal';

const Match = () => {
  const navigate = useNavigate();
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0]
  const legLength = 501
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState<string>("");
  const [doublesModalVisible, setDoublesModalVisible] = useState<boolean>(false);
  const [matchFinishedModalVisible, setMatchFinishedModalVisible] = useState<boolean>(false);

  const validateInput = (input: string) => {
    if (input) {
      const number: number = parseInt(input)
      if (!isNaN(number)) {
        setInput(input)
      }
    } else {
      setInput("")
    }
  }

  const handleKeyKlick = (value: string) => {
    if (value === "Clear") {
      setInput("")
    } else {
      setInput(input + value);
    }
  }

  const submitTurn = () => {
    const numberInput = input === "" ? "0" : input;
    const number: number = parseInt(numberInput);
    const remaining: number = calculateRemainingScore(legLength, turns);
    const newRemaining = remaining - number;

    if (number < 181 && newRemaining > -1 && newRemaining !== 1) {
      if (newRemaining === 0 || (remaining < 171 && (number === 0 || newRemaining < 171))) {
        setDoublesModalVisible(true);
      } else {
        setInput("");
        const newTurn: Turn = {
          score: number,
          dartsUsedOnDouble: 0
        }
        setTurns(turns => [...turns, newTurn]);
      }
    }
  }

  const handleDoubleSubmit = (dartsUsedOnDouble: number) => {
    setDoublesModalVisible(false);
    const numberInput = input === "" ? "0" : input;
    const number: number = parseInt(numberInput);
    const newTurn: Turn = {
      score: number,
      dartsUsedOnDouble: dartsUsedOnDouble
    }
    const newTurns = [...turns, newTurn];
    const remaining: number = calculateRemainingScore(legLength, newTurns);
    setInput("");
    setTurns(newTurns);
    if (remaining === 0) {
      setMatchFinishedModalVisible(true);
    }
  }

  const undoTurn = () => {
    setTurns(turns => turns.slice(0, -1));
  }

  const playAgain = () => {
    saveNewMatchToStorage();
    setMatchFinishedModalVisible(false);
    setTurns([]);
    setInput("");
  }

  return (
    <FadeIn>
      <div className={styles.match}>
        <Header title={"501"} />
        <div className={styles.scoreAndStats}>
          <div className={styles.score}>{calculateRemainingScore(legLength, turns)}</div>
          <div className={styles.statsWrapper}>
            <div className={styles.statsTitle}>Stats</div>
            <div className={styles.stats}>
              <div className={styles.stat}>3 dart average: {calculateThreeDartAverage(turns).toFixed(2)}</div>
              <div className={styles.stat}>Darts thrown: {turns.length * 3}</div>
              <div className={styles.stat}>Last score: {turns[turns.length - 1] ? turns[turns.length - 1].score : "-"}</div>
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          <Button onClick={() => undoTurn()} text={"Undo"} variant={"red"} />
          <Input placeholder={"Set a score"} value={input} validateInput={(value: string) => validateInput(value)} />
          <Button onClick={() => submitTurn()} text={"Submit"} variant={"green"} />
        </div>
        <div className={styles.keyboard}>
          {keys.map((key) => {
            return (
              <Button onClick={() => handleKeyKlick(key.toString())} key={key} text={key.toString()} />
            );
          })}
        </div>

        {/* Modals */}
        {doublesModalVisible && <DoublesModal open={doublesModalVisible} handleSubmit={(dartsUsedOnDouble) => handleDoubleSubmit(dartsUsedOnDouble)} />}
        {matchFinishedModalVisible && <MatchFinishedModal open={matchFinishedModalVisible} turns={turns} playAgain={() => playAgain()} quit={() => navigate('/')} />}
      </div>
    </FadeIn>
  );
};

export default Match;
