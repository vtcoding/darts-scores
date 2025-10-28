export type Match = {
  id: number;
  mode: number;
  legs: number;
  started_at: number;
  ended_at: number | null;
  turns: Turn[];
};

export type Turn = {
  score: number;
  leg: number;
  dartsUsedOnDouble: number;
}

export type PracticeMatch = {
  id: number,
  mode: string,
  finish_on: number,
  started_at: number;
  ended_at: number | null;
  turns: PracticeTurn[];
}

export type PracticeTurn = {
  dart1: number | null;
  dart2: number | null;
  dart3: number | null;
}

export type Option = {
  name: string;
}