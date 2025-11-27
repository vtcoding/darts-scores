import { useState } from "react";

import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import FadeIn from "../../components/FadeIn/FadeIn";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import type { Turn } from "../../types";
import {
  calculateRemainingScore,
  calculateThreeDartAverage,
  saveMatchProgressToStorage,
  saveNewMatchToStorage,
} from "../../utils";
import styles from "./Match.module.css";
import DoublesModal from "./components/DoublesModal/DoublesModal";
import MatchFinishedModal from "./components/MatchFinishedModal/MatchFinishedModal";

const Match = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const activeMatch = localStorage.getItem("activeMatch");

  if (!activeMatch) {
    return <Navigate to="/match-settings" />;
  }

  const matchSettings = JSON.parse(activeMatch as string);

  const keys = [
    { key: 1, name: 1 },
    { key: 2, name: 2 },
    { key: 3, name: 3 },
    { key: 0, name: 0 },
    { key: 4, name: 4 },
    { key: 5, name: 5 },
    { key: 6, name: 6 },
    { key: "clear", name: t("pages.match.clear") },
    { key: 7, name: 7 },
    { key: 8, name: 8 },
    { key: 9, name: 9 },
    { key: "undo", name: t("pages.match.undo") },
  ];
  const legLength = matchSettings.mode;
  const legs = matchSettings.legs;
  const [currentLeg, setCurrentLeg] = useState<number>(1);
  const [turns, setTurns] = useState<Turn[]>(matchSettings.turns);
  const [input, setInput] = useState<string>("");
  const [submitAction, setSubmitAction] = useState<string>("");
  const [doublesModalVisible, setDoublesModalVisible] = useState<boolean>(false);
  const [matchFinishedModalVisible, setMatchFinishedModalVisible] = useState<boolean>(false);

  const validateInput = (input: string) => {
    if (input) {
      const number: number = parseInt(input);
      if (!isNaN(number)) {
        setInput(input);
      }
    } else {
      setInput("");
    }
  };

  const handleKeyKlick = (value: string) => {
    if (value === "clear") {
      setInput("");
    } else if (value === "undo") {
      undoTurn();
    } else {
      setInput(input + value);
    }
  };

  const submitTurn = (action: string) => {
    setSubmitAction(action);
    const remaining: number = calculateRemainingScore(parseInt(legLength), currentLeg, turns);
    const numberInput = input === "" ? "0" : input;
    let score: number = 0;
    let newRemaining: number = 0;

    if (action === "remaining") {
      score = remaining - parseInt(numberInput);
      newRemaining = parseInt(numberInput);
    } else {
      score = parseInt(numberInput);
      newRemaining = remaining - score;
    }

    if (score < 181 && newRemaining > -1 && newRemaining !== 1) {
      /* if (newRemaining === 0 || (remaining < 171 && (number === 0 || newRemaining < 171))) { */
      if (score === 0 || newRemaining === 0 || (newRemaining < 51 && newRemaining > 1)) {
        setDoublesModalVisible(true);
      } else {
        setInput("");
        const newTurn: Turn = {
          score: score,
          leg: currentLeg,
          dartsUsedOnDouble: 0,
        };
        setTurns((prevTurns) => {
          const updated = [...prevTurns, newTurn];
          saveMatchProgressToStorage(updated);
          return updated;
        });
      }
    }
  };

  const handleDoubleSubmit = (dartsUsedOnDouble: number) => {
    setDoublesModalVisible(false);
    const numberInput = input === "" ? "0" : input;
    const remaining: number = calculateRemainingScore(parseInt(legLength), currentLeg, turns);
    let score: number = 0;
    let newRemaining: number = 0;

    if (submitAction === "remaining") {
      score = remaining - parseInt(numberInput);
      newRemaining = parseInt(numberInput);
    } else {
      score = parseInt(numberInput);
      newRemaining = remaining - score;
    }
    const newTurn: Turn = {
      score: score,
      leg: currentLeg,
      dartsUsedOnDouble: dartsUsedOnDouble,
    };
    const newTurns = [...turns, newTurn];
    setInput("");
    setTurns(newTurns);
    saveMatchProgressToStorage(newTurns);
    if (newRemaining === 0) {
      setMatchFinishedModalVisible(true);
    }
  };

  const undoTurn = () => {
    setTurns((prevTurns) => {
      const updated = prevTurns.slice(0, -1);
      saveMatchProgressToStorage(updated);
      return updated;
    });
  };

  const playAgain = () => {
    saveNewMatchToStorage(legLength, legs);
    setMatchFinishedModalVisible(false);
    setCurrentLeg(1);
    setTurns([]);
    setInput("");
  };

  return (
    <FadeIn>
      <div className={styles.match}>
        <Header title={`${legLength} - ${t("pages.match.firstTo")}`} showQuitButton />
        <div className={styles.matchInfo}>
          <Title text={`${t("pages.match.currentLeg")}: ${currentLeg}`} />
        </div>
        <div className={styles.scoreAndStats}>
          <div className={styles.score}>
            {calculateRemainingScore(parseInt(legLength), currentLeg, turns)}
          </div>
          <div className={styles.statsWrapper}>
            <div className={styles.statsTitle}>{t("pages.match.statsTitle")}</div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                {t("pages.match.threeDartAverage")}: {calculateThreeDartAverage(turns).toFixed(2)}
              </div>
              <div className={styles.stat}>
                {t("pages.match.dartsThrown")}: {turns.length * 3}
              </div>
              <div className={styles.stat}>
                {t("pages.match.lastScore")}:{" "}
                {turns[turns.length - 1] ? turns[turns.length - 1].score : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          <Button
            onClick={() => submitTurn("remaining")}
            text={t("pages.match.remaining")}
            variant={"green"}
            size={"large"}
          />
          <Input
            placeholder={t("pages.match.setScore")}
            value={input}
            validateInput={(value: string) => validateInput(value)}
          />
          <Button
            onClick={() => submitTurn("thrown")}
            text={t("pages.match.submit")}
            variant={"green"}
            size={"large"}
          />
        </div>
        <div className={styles.keyboard}>
          {keys.map((key) => {
            return (
              <div
                className={styles.key}
                onClick={() => handleKeyKlick(key.key.toString())}
                key={key.key}
              >
                <Title text={key.name.toString()} />
              </div>
            );
          })}
        </div>

        {/* Modals */}
        {doublesModalVisible && (
          <DoublesModal
            open={doublesModalVisible}
            handleSubmit={(dartsUsedOnDouble) => handleDoubleSubmit(dartsUsedOnDouble)}
          />
        )}
        {matchFinishedModalVisible && (
          <MatchFinishedModal
            open={matchFinishedModalVisible}
            turns={turns}
            playAgain={() => playAgain()}
            quit={() => navigate("/")}
          />
        )}
      </div>
    </FadeIn>
  );
};

export default Match;
