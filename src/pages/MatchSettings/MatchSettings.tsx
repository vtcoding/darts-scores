import { useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import FadeIn from "../../components/FadeIn/FadeIn";
import PageContent from "../../components/PageContent/PageContent";
import Title from "../../components/Title/Title";
import type { Option } from "../../types";
import { saveNewMatchToStorage } from "../../utils";

const MatchSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<string>("501");
  const [legs] = useState<string>("1");

  const startMatch = () => {
    saveNewMatchToStorage(modes.find((m) => m.id === mode)?.name ?? "501", parseInt(legs));
    navigate("/match");
  };

  const modes: Option[] = [
    { name: "301", id: "301" },
    { name: "501", id: "501" },
    { name: "701", id: "701" },
  ];

  return (
    <FadeIn>
      <PageContent headerTitle={t("pages.matchSettings.title")}>
        <Block>
          <Title text={t("pages.matchSettings.chooseMode")} />
          <Dropdown options={modes} selectedOption={mode} setSelectedOption={setMode} />
        </Block>
        <Button
          disabled={legs === ""}
          onClick={() => startMatch()}
          text={t("pages.matchSettings.startMatch")}
          variant={"green"}
        />
      </PageContent>
    </FadeIn>
  );
};

export default MatchSettings;
