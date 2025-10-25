export type Match = {
  id: number;
  started_at: number;
  ended_at: number | null;
  turns: Turn[];
};

export type Turn = {
  score: number;
  dartsUsedOnDouble: number;
}
