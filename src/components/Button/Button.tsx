import styles from "./Button.module.css";

interface ButtonProps {
    onClick: () => void;
    text: string;
    variant?: string;
    selected?: boolean;
    disabled?: boolean;
}

const Button = ({ onClick, text, variant, selected, disabled }: ButtonProps) => {
    return (
        <div
            onClick={() => onClick()}
            className={`
                ${styles.button}
                ${variant === "green" && styles.green}
                ${variant === "red" && styles.red}
                ${selected && styles.selected}
                ${disabled && styles.disabled}`}
        >
            {text}
        </div>
    );
}

export default Button;