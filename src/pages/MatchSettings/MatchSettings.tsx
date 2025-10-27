import { useNavigate } from "react-router-dom";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import { useState } from "react";
import { saveNewMatchToStorage } from "../../utils";
import styles from "./MatchSettings.module.css";

const MatchSettings = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<string>("501");
    const [legs] = useState<string>("1");

    const startMatch = () => {
        saveNewMatchToStorage(parseInt(mode), parseInt(legs));
        navigate("/match")
    }

    // Upcoming feature
    /* const validateInput = (input: string) => {
        if (input) {
            const number: number = parseInt(input)
            if (!isNaN(number)) {
                setLegs(input.toString())
            }
        } else {
            setLegs("")
        }
    } */

    return (
        <FadeIn>
            <PageContent headerTitle={"Match settings"}>
                <Block>
                    <Title text={"Choose mode"} />
                    <div className={styles.modes}>
                        <div onClick={() => setMode("301")} className={`${styles.mode} ${mode === "301" && styles.selected}`}>301</div>
                        <div onClick={() => setMode("501")} className={`${styles.mode} ${mode === "501" && styles.selected}`}>501</div>
                        <div onClick={() => setMode("701")} className={`${styles.mode} ${mode === "701" && styles.selected}`}>701</div>
                    </div>
                </Block>
                {/* Upcoming feature
                <Block>
                    <Title text={"Set match length (amount of legs)"} />
                    <input value={legs} onChange={(e) => validateInput(e.target.value)} className={styles.legsInput} />
                </Block> */}
                <Button disabled={legs === ""} onClick={() => startMatch()} text={"Start match"} variant={"green"} />
            </PageContent>
        </FadeIn>
    )
}

export default MatchSettings;