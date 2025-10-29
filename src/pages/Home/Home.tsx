import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import statistics from "../../assets/statistics.png";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block/Block";
import BlockParagraph from "../../components/BlockParagraph/BlockParagraph";
import BlockHeader from "../../components/BlockHeader/BlockHeader";

const Home = () => {
  const navigate = useNavigate();

  return (
    <FadeIn>
      <PageContent headerTitle={"Home"}>
        <Block>
          <Title text={"Welcome to Darts Scores!"} />
          <BlockParagraph>
            Play, practice and track your darts progress with Darts Scores.
          </BlockParagraph>
        </Block>
        <div className={styles.games}>
          <Block onClick={() => navigate("/match-settings")}>
            <BlockHeader>
              <ScoreboardIcon />
              <Title text={"Play match"} />
            </BlockHeader>
            <BlockParagraph>
              Play 301, 501 or 701.
            </BlockParagraph>
          </Block>
          <Block onClick={() => navigate("/practice-settings")}>
            <BlockHeader>
              <FitnessCenterIcon />
              <Title text={"Practice"} />
            </BlockHeader>
            <BlockParagraph>
              Practice your throwing with Around the clock, Doubles training or triples training..
            </BlockParagraph>
          </Block>
        </div>
        <Block onClick={() => navigate("/statistics")}>
          <BlockHeader>
            <EqualizerIcon />
            <Title text={"Statistics"} />
          </BlockHeader>
          <BlockParagraph>
            View your practice statistics and track your progress.
          </BlockParagraph>
          <img width={"100%"} src={statistics} />
        </Block>
      </PageContent>
    </FadeIn>
  );
};

export default Home;
