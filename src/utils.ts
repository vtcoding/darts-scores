import type { Game, Throw } from "./types";

export const calculateAverage = (throws: { score: number }[]) => {
    if (throws.length === 0) return 0;
    const totalScore: number = throws.reduce((acc, curr) => acc + curr.score, 0);
    return (totalScore / throws.length).toFixed(2);
}

export const calculateFirstNineAverage = (throws: Throw[]) => {
    if (throws.length === 0) return 0;
    const firstNine: Throw[] = throws.slice(0, 3);
    const totalScore: number = firstNine.reduce((acc, curr) => acc + curr.score, 0);
    return (totalScore / firstNine.length).toFixed(2);
}

export const calculateRemainingScore = (throws: Throw[]) => {
    return 501 - throws.filter(t => !t.bust).reduce((sum, t) => sum + t.score, 0);
}

export const calculateCheckoutPercentage = (games: Game[]) => {
    const percentages: number[] = []; 
    games.forEach(game => {
        let dartsUsedOnDoubles: number = 0;
        game.throws.forEach((t) => {
            dartsUsedOnDoubles += t.dartsUsedOnDouble;
        })
        const percentage: number = (1 / dartsUsedOnDoubles) * 100;
        percentages.push(percentage);
    })
    return (percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(2);
}