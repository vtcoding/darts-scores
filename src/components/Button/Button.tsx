import { useRef } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  onHoldReleased?: () => void;
  text: string;
  variant?: string;
  size?: string;
  selected?: boolean;
  disabled?: boolean;
}

const Button = ({
  onClick,
  onHoldReleased,
  text,
  variant,
  size,
  selected,
  disabled,
}: ButtonProps) => {
  // Explicitly type the ref
  const holdTimer = useRef<number | null>(null);
  const held = useRef(false);

  const handleClick = () => {
    if (!held.current) {
      onClick();
    }
  };

  const handleHoldStart = () => {
    held.current = false;
    holdTimer.current = window.setTimeout(() => {
      held.current = true;
      if (onHoldReleased) {
        onHoldReleased();
      }
    }, 1000);
  };

  const handleHoldEnd = () => {
    if (holdTimer.current !== null) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <div
      onMouseDown={handleHoldStart}
      onMouseUp={(e) => {
        handleHoldEnd();
        handleClick();
      }}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={(e) => {
        handleHoldEnd();
        handleClick();
      }}
      className={`
                ${styles.button}
                ${variant === 'green' && styles.green}
                ${variant === 'red' && styles.red}
                ${size === 'large' && styles.large}
                ${selected && styles.selected}
                ${disabled && styles.disabled}`}
    >
      {text}
    </div>
  );
};

export default Button;
