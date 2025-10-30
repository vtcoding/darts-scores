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
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <FadeIn>
      <PageContent headerTitle={t("pages.home.title")}>
        <Block>
          <Title text={t("pages.home.welcomeTitle")} />
          <BlockParagraph>
            {t("pages.home.welcomeDesc")}
          </BlockParagraph>
        </Block>
        <div className={styles.games}>
          <Block onClick={() => navigate("/match-settings")}>
            <BlockHeader>
              <ScoreboardIcon />
              <Title text={t("pages.home.matchTitle")} />
            </BlockHeader>
            <BlockParagraph>
              {t("pages.home.matchDesc")}
            </BlockParagraph>
          </Block>
          <Block onClick={() => navigate("/practice-settings")}>
            <BlockHeader>
              <FitnessCenterIcon />
              <Title text={t("pages.home.practiceTitle")} />
            </BlockHeader>
            <BlockParagraph>
              {t("pages.home.practiceDesc")}
            </BlockParagraph>
          </Block>
        </div>
        <Block onClick={() => navigate("/statistics")}>
          <BlockHeader>
            <EqualizerIcon />
            <Title text={t("pages.home.statisticsTitle")} />
          </BlockHeader>
          <BlockParagraph>
            {t("pages.home.statisticsDesc")}
          </BlockParagraph>
          <img width={"100%"} src={statistics} />
        </Block>
      </PageContent>
    </FadeIn >
  );
};

export default Home;
