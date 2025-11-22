export type Match = {
  id: number;
  mode: string;
  legs: number;
  started_at: number;
  ended_at: number | null;
  turns: Turn[];
};

export type Turn = {
  score: number;
  leg: number;
  dartsUsedOnDouble: number;
};

export type PracticeMatch = {
  id: number;
  mode: string;
  finish_on: number;
  started_at: number;
  ended_at: number | null;
  turns: PracticeTurn[];
};

export type PracticeTurn = {
  dart1: number | null;
  dart2: number | null;
  dart3: number | null;
};

export type Option = {
  name: string;
  id: string;
};

export type StatRow = {
  name: string;
  average: {
    value: number | string;
    unit: string;
  };
  best: {
    value: number | string;
    unit: string;
  };
  worst: {
    value: number | string;
    unit: string;
  };
};

export type ChartDataItem = {
  label: string;
  value: string;
};

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";
