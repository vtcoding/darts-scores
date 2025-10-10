export type Game = {
    id: number;
    started_at: number;
    ended_at: number | null;
    throws: Throw[];
}

export type Throw = {
    score: number;
    bust: boolean;
    dartsUsedOnDouble: number;
}

export type NotificationType = {
    type: string;
    message: string;
}