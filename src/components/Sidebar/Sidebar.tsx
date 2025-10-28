import HomeIcon from '@mui/icons-material/Home';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}><b>DARTS</b> SCORES</div>
            <div className={styles.navigation}>
                <div onClick={() => navigate("/")} className={styles.navItem}><HomeIcon /> Home</div>
                <div onClick={() => navigate("/match-settings")} className={styles.navItem}><ScoreboardIcon /> Play match</div>
                <div onClick={() => navigate("/practice-settings")} className={styles.navItem}><FitnessCenterIcon /> Practice</div>
                <div onClick={() => navigate("/statistics")} className={styles.navItem}><EqualizerIcon />Statistics</div>
            </div>
        </div >
    );
}

export default Sidebar;