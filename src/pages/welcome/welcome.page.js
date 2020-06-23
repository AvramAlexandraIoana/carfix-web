import React, { useState, useEffect } from "react";

import { WelcomePageWrapper, StepWrapper, ImageWrapper, InfoWrapper } from "./welcome.styled";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

export default function WelcomePage() {
  const [step, setStep] = useState(0);
  const history = useHistory();
  const renderStep0 = () => (
    <StepWrapper className="StepWrapper">
      <ImageWrapper
        className="ImageWrapper"
        style={{ background: "url(https://p1.pxfuel.com/preview/969/905/119/city-hotspot-road-reflection.jpg)" }}
      >
        <h1>Carfix</h1>
      </ImageWrapper>

      <InfoWrapper>
        <span className="Logo-mini">CARFIX</span>
        <h1>Bine ai venit</h1>
        <p>Cel mai scurt drum dintre tine si asiguratorul tau</p>
        <Button
          className="primary"
          type="primary"
          block
          shape="round"
          onClick={() => {
            setStep(3);
          }}
        >
          Incepe
        </Button>
        <Button
          className="Skip"
          type="link"
          onClick={() => {
            localStorage["welcomeTutorial"] = "done";
            history.replace("/");
          }}
        >
          Skip
        </Button>
      </InfoWrapper>
    </StepWrapper>
  );
  return <WelcomePageWrapper>{step === 0 && renderStep0()}</WelcomePageWrapper>;
}
