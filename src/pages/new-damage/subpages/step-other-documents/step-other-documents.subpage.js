import React, { useState, useContext } from "react";
import { ImagePreviewComponent } from "../../../../components";
import { OtherDocumentsWrapper, ImagePreviewWrapper, ImagesWrapper, Button } from "./step-other-documents.styled";
import { FancyHeader } from "../../../../components";
import { AppContext } from "../../../../context/app.context";
import { CameraOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { Progress } from "antd";

export default function StepOtherDocuments() {
  const { futureTask, setFutureTask } = useContext(AppContext);
  const [rapContraventie, setRapContraventie] = useState(null);
  const [anexa2, setAnexa2] = useState(null);

  const history = useHistory();

  const addStepDocumentInjured = () => {
    const stepOtherDocuments = {
      anexa2: anexa2,
      rapContraventie: rapContraventie,
    };
    setFutureTask({ ...futureTask, stepOtherDocuments: stepOtherDocuments });
    history.push("/step-map-2d");
  };

  return (
    <OtherDocumentsWrapper className="OtherDocumentsWrapper">
      <Progress style={{ marginBottom: 32 }} percent={74.8} />
      <FancyHeader title="Pasul 9" subtitle="Alte documente" />

      <ImagesWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Rap contraventie"
            setPhotoURI={setRapContraventie}
            photoURI={rapContraventie}
          />
        </ImagePreviewWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent icon={<CameraOutlined />} title="Anexa 2" setPhotoURI={setAnexa2} photoURI={anexa2} />
        </ImagePreviewWrapper>
      </ImagesWrapper>

      <Button type="primary" onClick={() => addStepDocumentInjured()}>
        Urmatorul pas
      </Button>
    </OtherDocumentsWrapper>
  );
}
