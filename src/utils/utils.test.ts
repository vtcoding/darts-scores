import type { Match, PracticeTurn, Turn } from "./types";
import {
  calculateCheckoutPercentage,
  calculateDartsHit,
  calculateFirstNineDartsAverage,
  calculateHitRate,
  calculateRemainingScore,
  calculateThreeDartAverage,
  calculateTotalCheckoutPercentage,
  calculateTotalFirstNineDartsAverage,
  calculateTotalHitRate,
  calculateTotalThreeDartAverage,
  formatDate,
  getBestAndWorsThreeDartAverages,
  getBestAndWorstCheckoutPercentages,
  getBestAndWorstFirstNineDartsAverages,
  getBestAndWorstHitRates,
  saveNewMatchToStorage,
  saveNewPracticeToStorage,
} from "./utils";

describe("Unit tests for utils", () => {
  describe("Common functions", () => {
    test("Expect date timestamp to be formatted to correct date format", () => {
      const timestamp = Date.UTC(2025, 10, 1, 0, 0);
      const result = formatDate(timestamp);
      expect(result).toBe("1.11.2025 - 02.00");
    });
  });

  describe("Localstorage functions", () => {
    beforeEach(() => {
      // mock localStorage
      const store: Record<string, string> = {};

      jest.spyOn(globalThis, "localStorage", "get").mockImplementation(
        () =>
          ({
            getItem: jest.fn((key: string) => store[key] || null),
            setItem: jest.fn((key: string, value: string) => {
              store[key] = value;
            }),
            removeItem: jest.fn((key: string) => {
              delete store[key];
            }),
            clear: jest.fn(() => {
              Object.keys(store).forEach((key) => delete store[key]);
            }),
          }) as unknown as Storage
      );
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("Create new match and test its lifecycle on localStorage", () => {
      const mockNow = 1700000000000;
      jest.spyOn(Date, "now").mockReturnValue(mockNow);

      const mode = "501";
      const legs = 1;

      saveNewMatchToStorage(mode, legs);

      const matchInStorage = localStorage.getItem("activeMatch");
      const result = matchInStorage ? JSON.parse(matchInStorage) : null;

      expect(result).toEqual({
        id: mockNow,
        mode,
        legs,
        started_at: mockNow,
        ended_at: null,
        turns: [],
      });
    });

    test("Create new practice match and test its lifecycle on localStorage", () => {
      const mockNow = 1700000000000;
      jest.spyOn(Date, "now").mockReturnValue(mockNow);

      const mode = "around-the-clock";
      const legs = 1;

      saveNewPracticeToStorage(mode, legs);

      const matchInStorage = localStorage.getItem("activePracticeMatch");
      const result = matchInStorage ? JSON.parse(matchInStorage) : null;

      expect(result).toEqual({
        id: mockNow,
        finish_on: 1,
        mode,
        started_at: mockNow,
        ended_at: null,
        turns: [],
      });
    });
  });

  describe("Statistics functions", () => {
    test("Expect remaining score to be...", () => {
      const legLength = 501;
      const currentLeg = 1;
      const turns: Turn[] = [
        {
          score: 100,
          leg: 1,
          dartsUsedOnDouble: 0,
        },
      ];

      const result = calculateRemainingScore(legLength, currentLeg, turns);
      expect(result).toBe(401);
    });

    test("Expect three dart average to be correct", () => {
      const turns: Turn[] = [
        { score: 60, leg: 1, dartsUsedOnDouble: 0 },
        { score: 45, leg: 1, dartsUsedOnDouble: 0 },
        { score: 100, leg: 1, dartsUsedOnDouble: 0 },
      ];

      const result = calculateThreeDartAverage(turns).toFixed(2);
      expect(result).toBe("68.33");
    });

    test("Expect three dart average to be 0", () => {
      const turns: Turn[] = [];

      const result = calculateThreeDartAverage(turns);
      expect(result).toBe(0);
    });

    test("Expect three dart average of multiple matches to be correct", () => {
      const turns1: Turn[] = [
        { score: 37, leg: 1, dartsUsedOnDouble: 0 },
        { score: 45, leg: 1, dartsUsedOnDouble: 0 },
      ];
      const turns2: Turn[] = [{ score: 120, leg: 2, dartsUsedOnDouble: 1 }];

      const matches: Match[] = [
        {
          id: 1,
          mode: "501",
          legs: 1,
          started_at: 1,
          ended_at: 2,
          turns: turns1,
        },
        {
          id: 2,
          mode: "501",
          legs: 1,
          started_at: 3,
          ended_at: 4,
          turns: turns2,
        },
      ];

      const result = calculateTotalThreeDartAverage(matches).toFixed(2);
      expect(result).toBe("67.33");
    });

    test("Expect three dart average for single match to be correct", () => {
      const turns: Turn[] = [
        { score: 60, leg: 1, dartsUsedOnDouble: 0 },
        { score: 100, leg: 1, dartsUsedOnDouble: 0 },
      ];
      const matches: Match[] = [{ id: 1, mode: "501", legs: 1, started_at: 1, ended_at: 2, turns }];

      const result = calculateTotalThreeDartAverage(matches).toFixed(2);
      expect(result).toBe("80.00");
    });

    test("Expect best and worst averages from multiple matches to be correct", () => {
      const match1: Match = {
        id: 1,
        mode: "501",
        legs: 1,
        started_at: 1,
        ended_at: 2,
        turns: [
          { score: 70, leg: 1, dartsUsedOnDouble: 0 },
          { score: 100, leg: 1, dartsUsedOnDouble: 0 },
        ],
      };
      const match2: Match = {
        id: 2,
        mode: "501",
        legs: 1,
        started_at: 3,
        ended_at: 4,
        turns: [
          { score: 90, leg: 1, dartsUsedOnDouble: 0 },
          { score: 120, leg: 1, dartsUsedOnDouble: 0 },
        ],
      };
      const match3: Match = {
        id: 3,
        mode: "501",
        legs: 1,
        started_at: 5,
        ended_at: 6,
        turns: [
          { score: 45, leg: 1, dartsUsedOnDouble: 0 },
          { score: 35, leg: 1, dartsUsedOnDouble: 0 },
        ],
      };

      const result = getBestAndWorsThreeDartAverages([match1, match2, match3]);
      expect(result.best.toFixed(2)).toBe("105.00");
      expect(result.worst.toFixed(2)).toBe("40.00");
    });

    test("Expect checkout percentage of single match to be correct", () => {
      const match: Match = {
        id: 1,
        mode: "301",
        legs: 1,
        started_at: 1,
        ended_at: 2,
        turns: [
          { score: 180, leg: 1, dartsUsedOnDouble: 0 },
          { score: 100, leg: 1, dartsUsedOnDouble: 1 },
          { score: 21, leg: 1, dartsUsedOnDouble: 2 },
        ],
      };

      const result = calculateCheckoutPercentage(match.turns).toFixed(2);
      expect(result).toBe("33.33");
    });
  });

  test("Expect checkout percentage of multiple matches to be correct", () => {
    const match1: Match = {
      id: 1,
      mode: "301",
      legs: 1,
      started_at: 1,
      ended_at: 2,
      turns: [
        { score: 100, leg: 1, dartsUsedOnDouble: 0 },
        { score: 100, leg: 1, dartsUsedOnDouble: 0 },
        { score: 60, leg: 1, dartsUsedOnDouble: 1 },
        { score: 41, leg: 1, dartsUsedOnDouble: 1 },
      ],
    };
    const match2: Match = {
      id: 2,
      mode: "301",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 180, leg: 1, dartsUsedOnDouble: 0 },
        { score: 80, leg: 1, dartsUsedOnDouble: 0 },
        { score: 21, leg: 1, dartsUsedOnDouble: 1 },
        { score: 20, leg: 1, dartsUsedOnDouble: 1 },
      ],
    };

    const result = calculateTotalCheckoutPercentage([match1, match2]).toFixed(2);
    expect(result).toBe("50.00");
  });

  test("Expect best and worst checkout percentages to be correct", () => {
    const match1: Match = {
      id: 1,
      mode: "301",
      legs: 1,
      started_at: 1,
      ended_at: 2,
      turns: [
        { score: 180, leg: 1, dartsUsedOnDouble: 0 },
        { score: 121, leg: 1, dartsUsedOnDouble: 1 },
      ],
    };
    const match2: Match = {
      id: 2,
      mode: "301",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 180, leg: 1, dartsUsedOnDouble: 0 },
        { score: 80, leg: 1, dartsUsedOnDouble: 0 },
        { score: 21, leg: 1, dartsUsedOnDouble: 1 },
        { score: 20, leg: 1, dartsUsedOnDouble: 1 },
      ],
    };
    const match3: Match = {
      id: 3,
      mode: "301",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 180, leg: 1, dartsUsedOnDouble: 0 },
        { score: 21, leg: 1, dartsUsedOnDouble: 0 },
        { score: 60, leg: 1, dartsUsedOnDouble: 1 },
        { score: 20, leg: 1, dartsUsedOnDouble: 1 },
        { score: 20, leg: 1, dartsUsedOnDouble: 1 },
      ],
    };

    const result = getBestAndWorstCheckoutPercentages([match1, match2, match3]);
    expect(result.best.toFixed(2)).toBe("100.00");
    expect(result.worst.toFixed(2)).toBe("33.33");
  });

  test("Expect first nine darts average to be correct", () => {
    const turns: Turn[] = [
      { score: 60, leg: 1, dartsUsedOnDouble: 0 },
      { score: 40, leg: 1, dartsUsedOnDouble: 0 },
      { score: 50, leg: 1, dartsUsedOnDouble: 0 },
    ];

    const result = calculateFirstNineDartsAverage(turns).toFixed(2);
    expect(result).toBe("50.00");
  });

  test("Expect first nine darts average of multiple matches to be correct", () => {
    const match1: Match = {
      id: 1,
      mode: "501",
      legs: 1,
      started_at: 1,
      ended_at: 2,
      turns: [
        { score: 40, leg: 1, dartsUsedOnDouble: 0 },
        { score: 30, leg: 1, dartsUsedOnDouble: 0 },
        { score: 35, leg: 1, dartsUsedOnDouble: 0 },
      ],
    };
    const match2: Match = {
      id: 2,
      mode: "501",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 50, leg: 1, dartsUsedOnDouble: 0 },
        { score: 40, leg: 1, dartsUsedOnDouble: 0 },
        { score: 45, leg: 1, dartsUsedOnDouble: 0 },
      ],
    };

    const result = calculateTotalFirstNineDartsAverage([match1, match2]).toFixed(2);
    expect(result).toBe("40.00");
  });

  test("Expect best and worst first nine darts averages to be correct", () => {
    const match1: Match = {
      id: 1,
      mode: "501",
      legs: 1,
      started_at: 1,
      ended_at: 2,
      turns: [
        { score: 40, leg: 1, dartsUsedOnDouble: 0 },
        { score: 30, leg: 1, dartsUsedOnDouble: 0 },
        { score: 35, leg: 1, dartsUsedOnDouble: 0 },
      ],
    };
    const match2: Match = {
      id: 2,
      mode: "501",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 50, leg: 1, dartsUsedOnDouble: 0 },
        { score: 40, leg: 1, dartsUsedOnDouble: 0 },
        { score: 45, leg: 1, dartsUsedOnDouble: 0 },
      ],
    };
    const match3: Match = {
      id: 3,
      mode: "501",
      legs: 1,
      started_at: 3,
      ended_at: 4,
      turns: [
        { score: 20, leg: 1, dartsUsedOnDouble: 0 },
        { score: 30, leg: 1, dartsUsedOnDouble: 0 },
        { score: 25, leg: 1, dartsUsedOnDouble: 0 },
      ],
    };

    const result = getBestAndWorstFirstNineDartsAverages([match1, match2, match3]);
    expect(result.best.toFixed(2)).toBe("45.00");
    expect(result.worst.toFixed(2)).toBe("25.00");
  });

  test("Expect hit darts to be correct", () => {
    const turns: PracticeTurn[] = [{ dart1: -1, dart2: 1, dart3: null }];

    const result = calculateDartsHit(turns);
    expect(result).toBe("1/2");
  });

  test("Expect hit rate to be correct", () => {
    const turns: PracticeTurn[] = [{ dart1: -1, dart2: 1, dart3: 1 }];

    const result = calculateHitRate(turns);
    expect(result.toFixed(2)).toBe("66.67");
  });

  test("Expect hit rate of multiple matches to be correct", () => {
    const mockNow = 1700000000000;
    const practiceMatch = {
      id: mockNow,
      mode: "around-the-clock",
      finish_on: 25,
      started_at: mockNow,
      ended_at: null,
      turns: [{ dart1: -1, dart2: 1, dart3: 1 }],
    };
    const practiceMatch2 = {
      id: mockNow,
      mode: "around-the-clock",
      finish_on: 25,
      started_at: mockNow,
      ended_at: null,
      turns: [{ dart1: 1, dart2: 1, dart3: 1 }],
    };

    const result = calculateTotalHitRate([practiceMatch, practiceMatch2]).toFixed(2);
    expect(result).toBe("83.33");
  });

  test("Expect best and worst hit rates to be correct", () => {
    const mockNow = 1700000000000;
    const practiceMatch = {
      id: mockNow,
      mode: "around-the-clock",
      finish_on: 25,
      started_at: mockNow,
      ended_at: null,
      turns: [{ dart1: -1, dart2: -1, dart3: 1 }],
    };
    const practiceMatch2 = {
      id: mockNow,
      mode: "around-the-clock",
      finish_on: 25,
      started_at: mockNow,
      ended_at: null,
      turns: [{ dart1: 1, dart2: 1, dart3: 1 }],
    };

    const result = getBestAndWorstHitRates([practiceMatch, practiceMatch2]);
    expect(result.best.toFixed(2)).toBe("100.00");
    expect(result.worst.toFixed(2)).toBe("33.33");
  });
});
