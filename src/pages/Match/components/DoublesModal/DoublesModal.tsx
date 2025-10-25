import styles from './DoublesModal.module.css';
import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Title from '../../../../components/Title/Title';

interface DoublesModalProps {
  open: boolean;
  handleSubmit: (dartsUsedOnDouble: number) => void;
}

const DoublesModal = ({ open, handleSubmit }: DoublesModalProps) => {
  const [selectedDouble, setSelectedDouble] = useState<number>(0);

  return (
    <Modal open={open}>
      <Title text={"How many darts used on doubles?"} />
      <div className={styles.doubles}>
        {
          [0, 1, 2, 3].map((double) => {
            return (
              <Button onClick={() => setSelectedDouble(double)} key={double} text={double.toString()} selected={selectedDouble === double} />
            )
          })
        }
      </div>
      <Button onClick={() => handleSubmit(selectedDouble)} text="Submit" variant="green" />
    </Modal>
  );
};

export default DoublesModal;
