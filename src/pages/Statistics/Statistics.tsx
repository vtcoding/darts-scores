import { useNavigate } from "react-router-dom";
import PageContent from "../../components/PageContent/PageContent";
import styles from "./Statistics.module.css";
import {
  calculateAverage,
  calculateCheckoutPercentage,
  calculateFirstNineAverage,
} from "../../utils";
import type { Game } from "../../types";
import Button from "@mui/material/Button";

const Statistics = () => {
  const navigate = useNavigate();

  const games = JSON.parse(localStorage.getItem("games") || "[]");
  const threeDartAverage = calculateAverage(
    games.flatMap((game: Game) => game.throws)
  );
  const firstNineAverage = calculateFirstNineAverage(
    games.flatMap((game: Game) => game.throws)
  );
  const gamesPlayed = games.length;
  const dartsThrown = games.reduce(
    (total: number, game: any) => total + game.throws.length * 3,
    0
  );
  const checkoutPercentage = calculateCheckoutPercentage(games);

  return (
    <PageContent>
      <h1>Statistics</h1>
      <div className={styles.general}>
        <div>3 dart average: {threeDartAverage}</div>
        <div>First 9 darts average: {firstNineAverage}</div>
        <div>Checkout percentage: {checkoutPercentage}%</div>
        <div>Legs played: {gamesPlayed}</div>
        <div>Darts thrown: {dartsThrown}</div>
      </div>
      {/* Add general stats (3 dart avg, first 9 darts, checkout rate, best leg) */}
      {/* Add ability to view all games */}
      <Button onClick={() => navigate("/")}>Go back</Button>
    </PageContent>
  );
};

export default Statistics;
