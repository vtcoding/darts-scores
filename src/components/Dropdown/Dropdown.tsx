import type { Option } from '../../types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styles from "./Dropdown.module.css";
import Title from '../Title/Title';
import { useState } from 'react';

interface DropdownProps {
    options: Option[];
    selectedOption: string;
    setSelectedOption: (value: string) => void;
}

const Dropdown = ({ options, selectedOption, setSelectedOption }: DropdownProps) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return <div className={styles.dropdown}>
        <div
            onClick={() => setMenuOpen(menuOpen ? false : true)}
            className={`${styles.select} ${menuOpen && styles.opened}`}
        >
            <Title text={selectedOption} />
            {menuOpen && <ArrowDropUpIcon />}
            {!menuOpen && <ArrowDropDownIcon />}
        </div>
        {
            menuOpen &&
            <div className={styles.menu}>
                {
                    options.map((option, index) => {
                        return (
                            <div
                                onClick={() => {
                                    setSelectedOption(option.name);
                                    setMenuOpen(false);
                                }}
                                key={index}
                                className={styles.menuOption}
                            >
                                <Title text={option.name} />
                            </div>
                        )
                    })
                }
            </div>
        }
    </div>
}

export default Dropdown;