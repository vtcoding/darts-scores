import Block from "../../components/Block/Block";
import BlockHeader from "../../components/BlockHeader/BlockHeader";
import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import RefreshIcon from '@mui/icons-material/Refresh';
import BlockParagraph from "../../components/BlockParagraph/BlockParagraph";
import { useNavigate } from "react-router-dom";
import { saveNewPracticeToStorage } from "../../utils";

const PracticeSettings = () => {
    const navigate = useNavigate();

    const startPracticeMatch = (mode: string, finishOn: number) => {
        saveNewPracticeToStorage(mode, finishOn);
        navigate("/practice")
    }

    return (
        <FadeIn>
            <PageContent headerTitle={"Practice"}>
                <Block onClick={() => startPracticeMatch("around-the-clock", 25)}>
                    <BlockHeader>
                        <RefreshIcon />
                        -
                        <Title text={"Play around the clock"} />
                    </BlockHeader>
                    <BlockParagraph>
                        Go through each sector (1-20) and finish with single bull or bull.
                    </BlockParagraph>
                </Block>
                <Block onClick={() => startPracticeMatch("doubles", 50)}>
                    <BlockHeader>
                        <RefreshIcon />
                        <b>2</b>
                        -
                        <Title text={"Play doubles practice"} />
                    </BlockHeader>
                    <BlockParagraph>
                        Go through each double (1-20).
                    </BlockParagraph>
                </Block>
                <Block onClick={() => startPracticeMatch("triples", 50)}>
                    <BlockHeader>
                        <RefreshIcon />
                        <b>3</b>
                        -
                        <Title text={"Play triples practice"} />
                    </BlockHeader>
                    <BlockParagraph>
                        Go through each triple (1-20).
                    </BlockParagraph>
                </Block>
                <Block disabled>
                    <BlockHeader>
                        <RefreshIcon />
                        <Title text={"Play Bob's 27"} />
                    </BlockHeader>
                    <BlockParagraph>
                        Upcoming
                    </BlockParagraph>
                </Block>
            </PageContent>
        </FadeIn>
    )
}

export default PracticeSettings;