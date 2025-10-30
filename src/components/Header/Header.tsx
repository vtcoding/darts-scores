import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Title from "../Title/Title";
import Link from "../Link/Link";
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from "react-i18next";

interface HeaderProps {
    title: string;
    toggleSidebar?: () => void;
    showQuitButton?: boolean;
}

const Header = ({ title, toggleSidebar, showQuitButton }: HeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className={styles.header}>
            <Title text={title} />
            {/* If showQuitButton is true, we're in a match and it will be shown instead of menu */}
            {
                !showQuitButton && toggleSidebar &&
                <div onClick={() => toggleSidebar()} className={styles.menuIcon}><MenuIcon /></div>
            }
            {
                showQuitButton &&
                <Link text={t("components.header.goToMenu")} onClick={() => navigate("/")} />
            }
        </div>
    );
}

export default Header;