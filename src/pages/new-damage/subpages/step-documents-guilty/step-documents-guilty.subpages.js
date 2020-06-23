import React, { useState, useContext, useEffect } from "react";
import { ImagePreviewComponent } from "../../../../components";
import { InjuredDocumentsWrapper, ImagePreviewWrapper, ImagesWrapper, Button } from "./step-documents-guilty.styled";
import { FancyHeader } from "../../../../components";
import { AppContext } from "../../../../context/app.context";
import { CameraOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Progress } from "antd";

export default function StepDocumentsGuilty() {
  const { futureTask, setFutureTask } = useContext(AppContext);
  const history = useHistory();
  const [identityCardPhoto, setIdentityCardPhoto] = useState(futureTask.stepDocumentsGuilty.identityCardPhoto || null);
  const [drivingLicensePhoto, setDrivingLicensePhoto] = useState(futureTask.stepDocumentsGuilty.drivingLicensePhoto || null);
  const [ownRCAcopyPhoto, setOwnRCAcopyPhoto] = useState(futureTask.stepDocumentsGuilty.ownRCAcopyPhoto || null);
  const [autoHeelPhoto, setAutoHeelPhoto] = useState(futureTask.stepDocumentsGuilty.autoHeelPhoto || null);

  useEffect(() => {
    const stepDocumentsGuilty = {
      identityCardPhoto: identityCardPhoto,
      drivingLicensePhoto: drivingLicensePhoto,
      autoHeelPhoto: autoHeelPhoto,
      ownRCAcopyPhoto: ownRCAcopyPhoto,
    };
    setFutureTask({ ...futureTask, stepDocumentsGuilty: stepDocumentsGuilty });
  }, [identityCardPhoto, drivingLicensePhoto, autoHeelPhoto, ownRCAcopyPhoto]);

  const addStepDocumentGuilty = () => {
    const stepDocumentsGuilty = {
      identityCardPhoto: identityCardPhoto,
      drivingLicensePhoto: drivingLicensePhoto,
      autoHeelPhoto: autoHeelPhoto,
      ownRCAcopyPhoto: ownRCAcopyPhoto,
    };
    setFutureTask({ ...futureTask, stepDocumentsGuilty: stepDocumentsGuilty });
    history.push("/step-other-documents");
  };

  return (
    <InjuredDocumentsWrapper className="">
      <Progress style={{ marginBottom: 32 }} percent={66.4} />
      <FancyHeader title="Pasul 8" subtitle="Documente vinovat" />

      <ImagesWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="CI vinovat"
            setPhotoURI={setIdentityCardPhoto}
            photoURI={identityCardPhoto}
          />
        </ImagePreviewWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Permis conducere vinovat"
            setPhotoURI={setDrivingLicensePhoto}
            photoURI={drivingLicensePhoto}
          />
        </ImagePreviewWrapper>

        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Talon auto vinovat"
            setPhotoURI={setAutoHeelPhoto}
            photoURI={autoHeelPhoto}
          />
        </ImagePreviewWrapper>

        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="RCA auto vinovat"
            setPhotoURI={setOwnRCAcopyPhoto}
            photoURI={ownRCAcopyPhoto}
          />
        </ImagePreviewWrapper>
      </ImagesWrapper>

      <Button type="primary" onClick={() => addStepDocumentGuilty()}>
        Salvează
      </Button>
    </InjuredDocumentsWrapper>
  );
}
