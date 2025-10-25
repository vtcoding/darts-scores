import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import Button from "../../components/Button/Button";
import { saveNewMatchToStorage } from "../../utils";
import FadeIn from "../../components/FadeIn/FadeIn";
import logo from "../../assets/logo.png";

const Menu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    saveNewMatchToStorage();
    navigate("/match");
  };

  return (
    <FadeIn>
      <div className={styles.menu}>
        <div className={styles.logo}><img className={styles.img} src={logo} alt="Logo" /></div>
        <div className={styles.container}>
          <Button onClick={() => startGame()} text={"PLAY MATCH"} />
          <Button disabled onClick={() => navigate("/")} text={"PRACTICE"} />
          <Button onClick={() => navigate("/statistics")} text={"STATISTICS"} />
        </div>
      </div>
    </FadeIn>
  );
};

export default Menu;
