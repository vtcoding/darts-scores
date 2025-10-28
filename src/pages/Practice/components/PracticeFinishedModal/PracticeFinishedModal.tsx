import { useEffect } from "react";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";
import type { PracticeMatch, PracticeTurn } from "../../../../types";

interface PracticeFinishedModalProps {
    open: boolean;
    turns: PracticeTurn[];
    playAgain: () => void;
    quitToMenu: () => void;
}

const PracticeFinishedModal = ({ open, turns, playAgain, quitToMenu }: PracticeFinishedModalProps) => {
    const activePracticeMatch = localStorage.getItem("activePracticeMatch");
    const storedPracticeMatches = JSON.parse(localStorage.getItem("practiceMatches") || "[]");

    const savePractice = () => {
        if (activePracticeMatch) {
            const matchId = parseInt(activePracticeMatch);
            const matchIndex = storedPracticeMatches.findIndex((storedMatch: PracticeMatch) => storedMatch.id === matchId);
            storedPracticeMatches[matchIndex].turns = turns;
            storedPracticeMatches[matchIndex].ended_at = Date.now();
            localStorage.setItem("matches", JSON.stringify(storedPracticeMatches));
        }
    }

    // Save match when modal is rendered
    useEffect(() => {
        savePractice()
    }, []);

    return <Modal open={open}>
        <Title text={"Practice ended"} />
        <Button onClick={playAgain} text={"Play again"} variant={"green"} />
        <Button onClick={quitToMenu} text={"Quit to menu"} variant={"red"} />
    </Modal>
}

export default PracticeFinishedModal;