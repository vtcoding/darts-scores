import { useNavigate } from "react-router-dom";
import PageContent from "../../components/PageContent/PageContent";
import type { Game } from "../../types";
import Button from "@mui/material/Button";

const Menu = () => {
  const navigate = useNavigate();

  const startGame = () => {
    const id = Date.now();
    const newGame: Game = {
      id: id,
      started_at: id,
      ended_at: null,
      throws: [],
    };

    localStorage.setItem("activeGame", id.toString());

    const games = JSON.parse(localStorage.getItem("games") || "[]");
    games.push(newGame);
    localStorage.setItem("games", JSON.stringify(games));

    navigate("/match");
  };

  return (
    <PageContent>
      <h1>Darts scores</h1>
      <Button onClick={() => startGame()} variant={"contained"}>
        Play
      </Button>
      <Button onClick={() => navigate("/statistics")}>Statistics</Button>
    </PageContent>
  );
};

export default Menu;
