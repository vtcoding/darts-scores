import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className={styles.header}>
            <div className={styles.logo}><img className={styles.img} src={logo} alt="Logo" /></div>
            <div className={styles.title}>{title}</div>
            <div onClick={() => navigate("/")} className={styles.quit}>GO TO MENU</div>
        </div>
    );
}

export default Header;