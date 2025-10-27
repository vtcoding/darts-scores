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

const Home = () => {
  const navigate = useNavigate();

  return (
    <FadeIn>
      <PageContent headerTitle={"Home"}>
        <Block>
          <Title text={"Welcome to Darts Scores!"} />
          <BlockParagraph>
            Darts Scores is an app for tracking your darts practicing.
            You can play 501, handful of practice games and track your progress in statistics.
          </BlockParagraph>
        </Block>
        <div className={styles.games}>
          <Block onClick={() => navigate("/match")}>
            <div className={styles.blockHeader}>
              <ScoreboardIcon />
              <Title text={"Play match"} />
            </div>
            <div className={styles.blockParagraph}>
              Play 501
            </div>
          </Block>
          <Block>
            <div className={styles.blockHeader}>
              <FitnessCenterIcon />
              <Title text={"Practice (upcoming feature)"} />
            </div>
            <BlockParagraph>
              Practice your throwing with Around the clock, Doubles training or Bobs 27.
            </BlockParagraph>
          </Block>
        </div>
        <Block onClick={() => navigate("/statistics")}>
          <div className={styles.blockHeader}>
            <EqualizerIcon />
            <Title text={"Statistics"} />
          </div>
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
