import type { Match, PracticeMatch, PracticeTurn, Turn } from './types';

export const saveNewMatchToStorage = (mode: string, legs: number) => {
  const id = Date.now();
  const match: Match = {
    id: id,
    mode: mode,
    legs: legs,
    started_at: id,
    ended_at: null,
    turns: [],
  };

  const matches = JSON.parse(localStorage.getItem("matches") || "[]");
  matches.push(match);

  localStorage.setItem("activeMatch", id.toString());
  localStorage.setItem("matches", JSON.stringify(matches));
}

export const getMatchSettings = () => {
  const id = localStorage.getItem("activeMatch");
  const matches = JSON.parse(localStorage.getItem("matches") || "[]");
  const currentMatch = matches.find((match: Match) => match.id === parseInt(id as string));
  return currentMatch;
}

export const calculateRemainingScore = (legLength: number, currentLeg: number, turns: Turn[]) => {
  let score = 0;
  turns.forEach((turn: Turn) => {
    if (turn.leg === currentLeg) {
      score = score + turn.score
    }
  })
  return legLength - score;
}

export const calculateThreeDartAverage = (turns: Turn[]) => {
  let totalScore = 0;
  turns.forEach(turn => {
    totalScore = totalScore + turn.score
  })
  return turns.length > 0 ? (totalScore / turns.length) : 0
}

export const calculateTotalThreeDartAverage = (matches: Match[]) => {
  let allTurns: Turn[] = [];
  matches.forEach(match => {
    allTurns = allTurns.concat(match.turns)
  })
  return calculateThreeDartAverage(allTurns);
}

export const getBestAndWorsThreeDartAverages = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach(match => {
    const average = calculateThreeDartAverage(match.turns);
    averages.push(average);
  });
  return {
    "best": averages.length > 0 ? Math.max(...averages) : 0,
    "worst": averages.length > 0 ? Math.min(...averages) : 0
  }
}

export const calculateCheckoutPercentage = (turns: Turn[]) => {
  let dartsUsedOnDoubles = 0;
  turns.forEach(turn => {
    dartsUsedOnDoubles = dartsUsedOnDoubles + turn.dartsUsedOnDouble
  });
  return dartsUsedOnDoubles > 0 ? (1 / dartsUsedOnDoubles) * 100 : 0;
}

export const calculateTotalCheckoutPercentage = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach(match => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return percentages.length > 0 ? percentages.reduce((sum, value) => sum + value, 0) / percentages.length : 0;
}

export const getBestAndWorstCheckoutPercentages = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach(match => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return {
    "best": percentages.length > 0 ? Math.max(...percentages) : 0,
    "worst": percentages.length > 0 ? Math.min(...percentages) : 0
  }
}

export const calculateFirstNineDartsAverage = (turns: Turn[]) => {
  return calculateThreeDartAverage(turns.slice(0, 3));
}

export const calculateTotalFirstNineDartsAverage = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach(match => {
    const average = calculateFirstNineDartsAverage(match.turns);
    averages.push(average);
  });
  return averages.length > 0 ? averages.reduce((sum, value) => sum + value, 0) / averages.length : 0;
}

export const getBestAndWorstFirstNineDartsAverages = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach(match => {
    const average = calculateFirstNineDartsAverage(match.turns);
    averages.push(average);
  });
  return {
    "best": averages.length > 0 ? Math.max(...averages) : 0,
    "worst": averages.length > 0 ? Math.min(...averages) : 0
  };
}

export const saveNewPracticeToStorage = (
  mode: string,
  finishOn: number,
) => {
  const id = Date.now();
  const practiceMatch: PracticeMatch = {
    id: id,
    mode: mode,
    finish_on: finishOn,
    started_at: id,
    ended_at: null,
    turns: [],
  }

  const practiceMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");
  practiceMatches.push(practiceMatch);

  localStorage.setItem("activePracticeMatch", id.toString());
  localStorage.setItem("practiceMatches", JSON.stringify(practiceMatches));
}

export const formatDate = (matchDate: number) => {
  const date = new Date(matchDate);

  // Get local date
  const localDate = date.toLocaleDateString("fi-FI");

  // Get local time (24-hour format, no seconds)
  const localTime = date.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return `${localDate} - ${localTime}`;
};

export const getPracticeMatchSettings = () => {
  const id = localStorage.getItem("activePracticeMatch");
  const practiceMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");
  const currentMatch = practiceMatches.find((match: Match) => match.id === parseInt(id as string));
  return currentMatch;
}

/* Darts hit on practice matches */
export const calculateDartsHit = (turns: PracticeTurn[]) => {
  let hitDarts = 0;
  let missedDarts = 0;
  turns.forEach(turn => {
    // Hit darts
    if (turn.dart1 && turn.dart1 !== -1) hitDarts++;
    if (turn.dart2 && turn.dart2 !== -1) hitDarts++;
    if (turn.dart3 && turn.dart3 !== -1) hitDarts++;

    // Missed darts
    if (turn.dart1 && turn.dart1 === -1) missedDarts++;
    if (turn.dart2 && turn.dart2 === -1) missedDarts++;
    if (turn.dart3 && turn.dart3 === -1) missedDarts++;
  });
  return `${hitDarts}/${missedDarts + hitDarts}`;
}

export const calculateHitRate = (turns: PracticeTurn[]) => {
  let hitDarts = 0;
  let missedDarts = 0;
  turns.forEach(turn => {
    // Hit darts
    if (turn.dart1 && turn.dart1 !== -1) hitDarts++;
    if (turn.dart2 && turn.dart2 !== -1) hitDarts++;
    if (turn.dart3 && turn.dart3 !== -1) hitDarts++;

    // Missed darts
    if (turn.dart1 && turn.dart1 === -1) missedDarts++;
    if (turn.dart2 && turn.dart2 === -1) missedDarts++;
    if (turn.dart3 && turn.dart3 === -1) missedDarts++;
  });
  const totalDarts = hitDarts + missedDarts;
  return totalDarts > 0 ? (hitDarts / totalDarts) * 100 : 0;
}

export const calculateTotalHitRate = (matches: PracticeMatch[]) => {
  const rates: number[] = [];
  matches.forEach(match => {
    const rate = calculateHitRate(match.turns);
    rates.push(rate);
  });
  return rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
}

export const calculateBestAndWorstHitRates = (matches: PracticeMatch[]) => {
  const rates: number[] = [];
  matches.forEach(match => {
    const rate = calculateHitRate(match.turns);
    rates.push(rate);
  });
  return {
    "best": rates.length > 0 ? Math.max(...rates) : 0,
    "worst": rates.length > 0 ? Math.min(...rates) : 0
  };
}