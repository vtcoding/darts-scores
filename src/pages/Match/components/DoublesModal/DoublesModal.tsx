import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Title from '../../../../components/Title/Title';
import styles from './DoublesModal.module.css';

interface DoublesModalProps {
  open: boolean;
  handleSubmit: (dartsUsedOnDouble: number) => void;
}

const DoublesModal = ({ open, handleSubmit }: DoublesModalProps) => {
  const { t, i18n } = useTranslation();
  const [selectedDouble, setSelectedDouble] = useState<number>(0);

  console.log(i18n.language);

  return (
    <Modal open={open}>
      <Title text={t('pages.match.doublesModal.title')} />
      <div className={styles.doubles}>
        {[0, 1, 2, 3].map((double) => {
          return (
            <Button
              onClick={() => setSelectedDouble(double)}
              key={double}
              text={double.toString()}
              selected={selectedDouble === double}
            />
          );
        })}
      </div>
      <Button
        onClick={() => handleSubmit(selectedDouble)}
        text={t('pages.match.doublesModal.submit')}
        variant="green"
      />
    </Modal>
  );
};

export default DoublesModal;
