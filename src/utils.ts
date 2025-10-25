import type { Match, Turn } from './types';

export const calculateRemainingScore = (legLength: number, turns: Turn[]) => {
  let score = 0;
  turns.forEach((turn: Turn) => {
    score = score + turn.score
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
  return { "best": Math.max(...averages), "worst": Math.min(...averages) }
}

export const calculateCheckoutPercentage = (turns: Turn[]) => {
  let dartsUsedOnDoubles = 0;
  turns.forEach(turn => {
    dartsUsedOnDoubles = dartsUsedOnDoubles + turn.dartsUsedOnDouble
  });
  return (1 / dartsUsedOnDoubles) * 100;
}

export const calculateTotalCheckoutPercentage = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach(match => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return percentages.reduce((sum, value) => sum + value, 0) / percentages.length;
}

export const getBestAndWorstCheckoutPercentages = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach(match => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return { "best": Math.max(...percentages), "worst": Math.min(...percentages) }
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
  return averages.reduce((sum, value) => sum + value, 0) / averages.length;
}

export const getBestAndWorstFirstNineDartsAverages = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach(match => {
    const average = calculateFirstNineDartsAverage(match.turns);
    averages.push(average);
  });
  return { "best": Math.max(...averages), "worst": Math.min(...averages) };
}

export const saveNewMatchToStorage = () => {
  const id = Date.now();
  const match: Match = {
    id: id,
    started_at: id,
    ended_at: null,
    turns: [],
  };

  const games = JSON.parse(localStorage.getItem("matches") || "[]");
  games.push(match);

  localStorage.setItem("activeMatch", id.toString());
  localStorage.setItem("matches", JSON.stringify(games));
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