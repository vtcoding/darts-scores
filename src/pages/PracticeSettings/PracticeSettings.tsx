import Block from "../../components/Block/Block";
import BlockHeader from "../../components/BlockHeader/BlockHeader";
import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import RefreshIcon from '@mui/icons-material/Refresh';
import BlockParagraph from "../../components/BlockParagraph/BlockParagraph";
import { useNavigate } from "react-router-dom";
import { saveNewPracticeToStorage } from "../../utils";
import { useTranslation } from "react-i18next";

const PracticeSettings = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const startPracticeMatch = (mode: string, finishOn: number) => {
        saveNewPracticeToStorage(mode, finishOn);
        navigate("/practice")
    }

    return (
        <FadeIn>
            <PageContent headerTitle={t("pages.practiceSettings.title")}>
                <Block onClick={() => startPracticeMatch("around-the-clock", 25)}>
                    <BlockHeader>
                        <RefreshIcon />
                        -
                        <Title text={t("pages.practiceSettings.aroundTheClockTitle")} />
                    </BlockHeader>
                    <BlockParagraph>
                        {t("pages.practiceSettings.aroundTheClockDesc")}
                    </BlockParagraph>
                </Block>

                <Block onClick={() => startPracticeMatch("doubles", 50)}>
                    <BlockHeader>
                        <RefreshIcon />
                        <b>2</b>
                        -
                        <Title text={t("pages.practiceSettings.doublesTitle")} />
                    </BlockHeader>
                    <BlockParagraph>
                        {t("pages.practiceSettings.doublesDesc")}
                    </BlockParagraph>
                </Block>

                <Block onClick={() => startPracticeMatch("triples", 50)}>
                    <BlockHeader>
                        <RefreshIcon />
                        <b>3</b>
                        -
                        <Title text={t("pages.practiceSettings.triplesTitle")} />
                    </BlockHeader>
                    <BlockParagraph>
                        {t("pages.practiceSettings.triplesDesc")}
                    </BlockParagraph>
                </Block>

                {/* <Block disabled>
                    <BlockHeader>
                        <RefreshIcon />
                        <Title text={t("pages.practiceSettings.bobs27Title")} />
                    </BlockHeader>
                    <BlockParagraph>
                        {t("pages.practiceSettings.bobs27Desc")}
                    </BlockParagraph>
                </Block> */}
            </PageContent>

        </FadeIn>
    )
}

export default PracticeSettings;