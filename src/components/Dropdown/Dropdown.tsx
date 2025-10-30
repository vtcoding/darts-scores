import { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import type { Option } from '../../types';
import Title from '../Title/Title';
import styles from './Dropdown.module.css';

interface DropdownProps {
  options: Option[];
  selectedOption: Option;
  setSelectedOption: (value: Option) => void;
}

const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setMenuOpen(menuOpen ? false : true)}
        className={`${styles.select} ${menuOpen && styles.opened}`}
      >
        <Title text={selectedOption.name} />
        {menuOpen && <ArrowDropUpIcon />}
        {!menuOpen && <ArrowDropDownIcon />}
      </div>
      {menuOpen && (
        <div className={styles.menu}>
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  setSelectedOption(option);
                  setMenuOpen(false);
                }}
                key={option.id}
                className={styles.menuOption}
              >
                <Title text={option.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
