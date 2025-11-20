import { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import type { Option } from "../../utils/types";
import Title from "../Title/Title";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  options: Option[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Dropdown = ({ options, selectedOption, setSelectedOption }: DropdownProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setMenuOpen(menuOpen ? false : true)}
        className={`${styles.select} ${menuOpen && styles.opened}`}
      >
        <Title text={options.find((o) => o.id === selectedOption)?.name ?? ""} />
        {menuOpen && <ArrowDropUpIcon />}
        {!menuOpen && <ArrowDropDownIcon />}
      </div>
      {menuOpen && (
        <div className={styles.menu}>
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  setSelectedOption(option.id);
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
