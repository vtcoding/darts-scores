import MuiModal from '@mui/material/Modal';
import type { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    children: ReactNode;
    open: boolean;
}

const Modal = ({ children, open }: ModalProps) => {
    return (
        <MuiModal open={open}>
            <div className={styles.modal}>
                {children}
            </div>
        </MuiModal>);
}

export default Modal;