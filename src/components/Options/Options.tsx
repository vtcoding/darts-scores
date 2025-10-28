import styles from "./Options.module.css";
import type { Option } from '../../types';

interface OptionsProps {
    options: Option[];
    selectedOption: string;
    setSelectedOption: (value: string) => void;
}

const Options = ({ options, selectedOption, setSelectedOption }: OptionsProps) => {
    return (
        <div className={styles.options}>
            {
                options.map((option, index) => {
                    return <div
                        key={index}
                        onClick={() => setSelectedOption(option.name)}
                        className={`
                            ${styles.option}
                            ${selectedOption === option.name && styles.selected}`}>
                        {option.name}
                    </div>
                })
            }
        </div>);
}

export default Options;