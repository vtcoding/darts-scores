import styles from "./Button.module.css";

interface ButtonProps {
    onClick: () => void;
    text: string;
    variant?: string;
    size?: string;
    selected?: boolean;
    disabled?: boolean;
}

const Button = ({ onClick, text, variant, size, selected, disabled }: ButtonProps) => {
    return (
        <div
            onClick={() => onClick()}
            className={`
                ${styles.button}
                ${variant === "green" && styles.green}
                ${variant === "red" && styles.red}
                ${size === "large" && styles.large}
                ${selected && styles.selected}
                ${disabled && styles.disabled}`}
        >
            {text}
        </div>
    );
}

export default Button;