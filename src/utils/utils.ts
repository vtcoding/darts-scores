import type { Frequency, Match, PracticeMatch, PracticeTurn, SectorRate, Turn } from "./types";

export const formatDate = (matchDate: number) => {
  const date = new Date(matchDate);

  // Get local date
  const localDate = date.toLocaleDateString("fi-FI");

  // Get local time (24-hour format, no seconds)
  const localTime = date.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${localDate} - ${localTime}`;
};

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

  localStorage.setItem("activeMatch", JSON.stringify(match));
  localStorage.setItem("matches", JSON.stringify(matches));
};

export const saveMatchProgressToStorage = (turns: Turn[]) => {
  const activeMatch = localStorage.getItem("activeMatch");
  const match = activeMatch ? JSON.parse(activeMatch) : null;
  match.turns = turns;
  localStorage.setItem("activeMatch", JSON.stringify(match));
};

export const calculateRemainingScore = (legLength: number, currentLeg: number, turns: Turn[]) => {
  let score = 0;
  turns.forEach((turn: Turn) => {
    if (turn.leg === currentLeg) {
      score = score + turn.score;
    }
  });
  return legLength - score;
};

export const calculateThreeDartAverage = (turns: Turn[]) => {
  let totalScore = 0;
  turns.forEach((turn) => {
    totalScore = totalScore + turn.score;
  });
  return turns.length > 0 ? totalScore / turns.length : 0;
};

export const calculateTotalThreeDartAverage = (matches: Match[]) => {
  let allTurns: Turn[] = [];
  matches.forEach((match) => {
    allTurns = allTurns.concat(match.turns);
  });
  return calculateThreeDartAverage(allTurns);
};

export const getBestAndWorsThreeDartAverages = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach((match) => {
    const average = calculateThreeDartAverage(match.turns);
    averages.push(average);
  });
  return {
    best: averages.length > 0 ? Math.max(...averages) : 0,
    worst: averages.length > 0 ? Math.min(...averages) : 0,
  };
};

export const calculateCheckoutPercentage = (turns: Turn[]) => {
  let darts_used_on_doubles = 0;
  turns.forEach((turn) => {
    darts_used_on_doubles = darts_used_on_doubles + turn.darts_used_on_double;
  });
  return darts_used_on_doubles > 0 ? (1 / darts_used_on_doubles) * 100 : 0;
};

export const calculateTotalCheckoutPercentage = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach((match) => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return percentages.length > 0
    ? percentages.reduce((sum, value) => sum + value, 0) / percentages.length
    : 0;
};

export const getBestAndWorstCheckoutPercentages = (matches: Match[]) => {
  const percentages: number[] = [];
  matches.forEach((match) => {
    const percentage = calculateCheckoutPercentage(match.turns);
    if (percentage) {
      percentages.push(percentage);
    }
  });
  return {
    best: percentages.length > 0 ? Math.max(...percentages) : 0,
    worst: percentages.length > 0 ? Math.min(...percentages) : 0,
  };
};

export const calculateFirstNineDartsAverage = (turns: Turn[]) => {
  return calculateThreeDartAverage(turns.slice(0, 3));
};

export const calculateTotalFirstNineDartsAverage = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach((match) => {
    const average = calculateFirstNineDartsAverage(match.turns);
    averages.push(average);
  });
  return averages.length > 0
    ? averages.reduce((sum, value) => sum + value, 0) / averages.length
    : 0;
};

export const getBestAndWorstFirstNineDartsAverages = (matches: Match[]) => {
  const averages: number[] = [];
  matches.forEach((match) => {
    const average = calculateFirstNineDartsAverage(match.turns);
    averages.push(average);
  });
  return {
    best: averages.length > 0 ? Math.max(...averages) : 0,
    worst: averages.length > 0 ? Math.min(...averages) : 0,
  };
};

export const saveNewPracticeToStorage = (mode: string, finishOn: number) => {
  const id = Date.now();
  const practiceMatch: PracticeMatch = {
    id: id,
    mode: mode,
    finish_on: finishOn,
    started_at: id,
    ended_at: null,
    turns: [],
  };

  const practiceMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");
  practiceMatches.push(practiceMatch);

  localStorage.setItem("activePracticeMatch", JSON.stringify(practiceMatch));
  localStorage.setItem("practiceMatches", JSON.stringify(practiceMatches));
};

export const savePracticeMatchProgressToStorage = (turns: PracticeTurn[]) => {
  const activePracticeMatch = localStorage.getItem("activePracticeMatch");
  const practiceMatch = activePracticeMatch ? JSON.parse(activePracticeMatch) : null;
  practiceMatch.turns = turns;
  localStorage.setItem("activePracticeMatch", JSON.stringify(practiceMatch));
};

/* Darts hit on practice matches */
export const calculateDartsHit = (turns: PracticeTurn[]) => {
  let hitDarts = 0;
  let missedDarts = 0;
  turns.forEach((turn) => {
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
};

export const calculateHitRate = (turns: PracticeTurn[]) => {
  let hitDarts = 0;
  let missedDarts = 0;
  turns.forEach((turn) => {
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
};

export const calculateTotalHitRate = (matches: PracticeMatch[]) => {
  const rates: number[] = [];
  matches.forEach((match) => {
    const rate = calculateHitRate(match.turns);
    rates.push(rate);
  });
  return rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
};

export const getBestAndWorstHitRates = (matches: PracticeMatch[]) => {
  const rates: number[] = [];
  matches.forEach((match) => {
    const rate = calculateHitRate(match.turns);
    rates.push(rate);
  });
  return {
    best: rates.length > 0 ? Math.max(...rates) : 0,
    worst: rates.length > 0 ? Math.min(...rates) : 0,
  };
};

export const getHitRatesForSector = (turns: PracticeTurn[], sector: number) => {
  const darts = turns.flatMap((t) => [t.dart1, t.dart2, t.dart3]);

  // Find index of target
  const targetIndex = darts.findIndex((d) => d === sector);
  if (targetIndex === -1) return 0; // target not found

  // Walk backwards counting consecutive -1 values
  let count = 0;
  for (let i = targetIndex - 1; i >= 0; i--) {
    const dart = darts[i];
    if (dart === -1) {
      count++;
    } else if (dart !== null) {
      break; // stop if we hit any number other than -1
    }
  }

  return darts.length > 0 ? (count === 0 ? 100 : (1 / (count + 1)) * 100) : 0;
};

export const getTotalHitRatesForSector = (matches: PracticeMatch[], sector: number) => {
  const ratesForSector: number[] = [];
  matches.forEach((match) => {
    const rate = getHitRatesForSector(match.turns, sector);
    ratesForSector.push(rate);
  });
  return ratesForSector.length > 0
    ? ratesForSector.reduce((a, b) => a + b, 0) / ratesForSector.length
    : 0;
};

export const getSectorRates = (
  matches: PracticeMatch[],
  sectors: number[]
) => {
  return sectors.map((sector) => ({
    sector,
    rate: getTotalHitRatesForSector(matches, sector),
  }));
};

export const sortSectors = (
  arr: SectorRate[],
  key: "sector" | "rate",
  order: "asc" | "desc"
): SectorRate[] => {
  return [...arr].sort((a, b) => {
    const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    return order === "asc" ? result : -result;
  });
};

// ---- Helper for generating period labels ----
const getPeriodLabel = (timestamp: number, frequency: Frequency) => {
  const d = new Date(timestamp);

  switch (frequency) {
    case "daily":
      return d.toISOString().split("T")[0];

    case "weekly": {
      const year = d.getUTCFullYear();
      const firstDay = new Date(Date.UTC(year, 0, 1));
      const days = Math.floor((d.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.ceil((days + firstDay.getUTCDay() + 1) / 7);
      return `${year}-W${weekNumber}`;
    }

    case "monthly":
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

    case "yearly":
      return `${d.getUTCFullYear()}`;
  }
};

export const getMatchStatistics = (matches: Match[], frequency: Frequency) => {
  // ---- Group matches by period ----
  const groups: Record<string, Match[]> = {};

  matches.forEach((match) => {
    const label = getPeriodLabel(match.started_at, frequency);
    if (!groups[label]) groups[label] = [];
    groups[label].push(match);
  });

  // ---- Compute statistics for each period ----
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, matchesForPeriod]) => {
      // All turns for 3-dart avg
      const allTurns = matchesForPeriod.flatMap((m) => m.turns);

      const threeDartAverage = calculateThreeDartAverage(allTurns);

      // First nine avg: per match → mean
      const firstNineAverages = matchesForPeriod.map((m) =>
        calculateFirstNineDartsAverage(m.turns)
      );
      const firstNineDartAverage =
        firstNineAverages.reduce((a, b) => a + b, 0) / (firstNineAverages.length || 1);

      // Checkout %: per match → mean
      const checkoutPercentages = matchesForPeriod.map((m) => calculateCheckoutPercentage(m.turns));
      const checkoutPercentage =
        checkoutPercentages.reduce((a, b) => a + b, 0) / (checkoutPercentages.length || 1);

      return {
        label,
        threeDartAverage,
        firstNineDartAverage,
        checkoutPercentage,
      };
    });
};

export const getPracticeMatchStatistics = (
  practiceMatches: PracticeMatch[],
  frequency: Frequency
) => {
  // ---- Group matches by period ----
  const groups: Record<string, PracticeMatch[]> = {};

  practiceMatches.forEach((match) => {
    const label = getPeriodLabel(match.started_at, frequency);
    if (!groups[label]) groups[label] = [];
    groups[label].push(match);
  });

  // ---- Compute statistics for each period ----
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, matchesForPeriod]) => {
      // All turns for hit rate
      const hitRates = matchesForPeriod.map((m) => calculateHitRate(m.turns));

      const hitRate = hitRates.reduce((a, b) => a + b, 0) / (hitRates.length || 1);
      return {
        label,
        hitRate,
      };
    });
};
