import styles from "./CheckoutModal.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface CheckoutModalProps {
    dartsUsedOnDouble: number;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDartsUsedOnDouble: React.Dispatch<React.SetStateAction<number>>;
    confirmDoubles: () => void;
}

const CheckoutModal = ({dartsUsedOnDouble, setModalVisible, setDartsUsedOnDouble, confirmDoubles}: CheckoutModalProps) => {
    return (
        <Modal onClose={() => {
                setModalVisible(false)
                setDartsUsedOnDouble(0)
            }} open={true}>
                <div className={styles.modalHeading}>Darts used on a double</div>
                <div className={styles.modalButtons}>
                    {[0, 1, 2, 3].map((num) => {
                        return <Button key={num} selected={num === dartsUsedOnDouble} clickHandler={() => setDartsUsedOnDouble(num)} text={num.toString()} />
                    })}
                </div>
                <Button clickHandler={() => confirmDoubles()} text="Confirm" selected={false} />
        </Modal>
    )
}

export default CheckoutModal