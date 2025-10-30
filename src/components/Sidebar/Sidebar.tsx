import HomeIcon from '@mui/icons-material/Home';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gb from "../../assets/gb.png";
import fi from "../../assets/fi.png";
import Title from '../Title/Title';

const Sidebar = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}><b>DARTS</b> SCORES</div>
            <div className={styles.navigation}>
                <div onClick={() => navigate("/")} className={styles.navItem}><HomeIcon /> {t("components.sidebar.home")}</div>
                <div onClick={() => navigate("/match-settings")} className={styles.navItem}><ScoreboardIcon /> {t("components.sidebar.playMatch")}</div>
                <div onClick={() => navigate("/practice-settings")} className={styles.navItem}><FitnessCenterIcon /> {t("components.sidebar.practice")}</div>
                <div onClick={() => navigate("/statistics")} className={styles.navItem}><EqualizerIcon /> {t("components.sidebar.statistics")}</div>
            </div>
            <div className={styles.languages}>
                <div className={styles.languageTitle}><Title text={t("components.sidebar.language")} /></div>
                <img onClick={() => changeLanguage("en")} className={`${styles.language} ${currentLanguage === "en" && styles.selected}`} src={gb} />
                <img onClick={() => changeLanguage("fi")} className={`${styles.language} ${currentLanguage === "fi" && styles.selected}`} src={fi} />
            </div>
        </div >
    );
}

export default Sidebar;