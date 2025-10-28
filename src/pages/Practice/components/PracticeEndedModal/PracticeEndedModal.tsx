import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Title from "../../../../components/Title/Title";

interface PracticeEndedModalProps {
    open: boolean;
    playAgain: () => void;
    quitToMenu: () => void;
}

const PracticeEndedModal = ({ open, playAgain, quitToMenu }: PracticeEndedModalProps) => {
    return <Modal open={open}>
        <Title text={"Practice ended"} />
        <Button onClick={playAgain} text={"Play again"} variant={"green"} />
        <Button onClick={quitToMenu} text={"Quit to menu"} variant={"red"} />
    </Modal>
}

export default PracticeEndedModal;