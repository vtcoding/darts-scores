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
