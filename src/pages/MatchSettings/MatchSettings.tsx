import { useNavigate } from "react-router-dom";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import { useState } from "react";
import { saveNewMatchToStorage } from "../../utils";
import Options from "../../components/Options/Options";

const MatchSettings = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<string>("501");
    const [legs] = useState<string>("1");

    const startMatch = () => {
        saveNewMatchToStorage(parseInt(mode), parseInt(legs));
        navigate("/match")
    }

    const options = [
        { name: "301", id: "301" },
        { name: "501", id: "501" },
        { name: "701", id: "701" }
    ]

    return (
        <FadeIn>
            <PageContent headerTitle={"Match settings"}>
                <Block>
                    <Title text={"Choose mode"} />
                    <Options options={options} selectedOption={mode} setSelectedOption={setMode} />
                </Block>
                <Button disabled={legs === ""} onClick={() => startMatch()} text={"Start match"} variant={"green"} />
            </PageContent>
        </FadeIn>
    )
}

export default MatchSettings;