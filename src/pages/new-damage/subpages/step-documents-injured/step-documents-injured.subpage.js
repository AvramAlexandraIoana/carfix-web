import React, { useState, useContext, useEffect } from "react";
import { ImagePreviewComponent } from "../../../../components";
import { InjuredDocumentsWrapper, ImagePreviewWrapper, ImagesWrapper, Button } from "./step-documents-injured.styled";
import { FancyHeader } from "../../../../components";
import { AppContext } from "../../../../context/app.context";
import { CameraOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Progress } from "antd";
export default function StepDocumentsInjured() {
  const { futureTask, setFutureTask } = useContext(AppContext);
  const [identityCardPhoto, setIdentityCardPhoto] = useState(null);
  const [drivingLicensePhoto, setDrivingLicensePhoto] = useState(null);
  const [ownRCAcopyPhoto, setOwnRCAcopyPhoto] = useState(null);
  const [empowermentPhoto, setEmpowermentPhoto] = useState(null);
  const [autoHeelPhoto, setAutoHeelPhoto] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const stepDocumentsInjured = {
      identityCardPhoto: identityCardPhoto,
      drivingLicensePhoto: drivingLicensePhoto,
      autoHeelPhoto: autoHeelPhoto,
      ownRCAcopyPhoto: ownRCAcopyPhoto,
      empowermentPhoto: empowermentPhoto,
    };
    setFutureTask({ ...futureTask, stepDocumentsInjured: stepDocumentsInjured });
  }, [identityCardPhoto, drivingLicensePhoto, autoHeelPhoto, ownRCAcopyPhoto, empowermentPhoto]);

  const addStepDocumentInjured = () => {
    const stepDocumentsInjured = {
      identityCardPhoto: identityCardPhoto,
      drivingLicensePhoto: drivingLicensePhoto,
      autoHeelPhoto: autoHeelPhoto,
      ownRCAcopyPhoto: ownRCAcopyPhoto,
      empowermentPhoto: empowermentPhoto,
    };
    setFutureTask({ ...futureTask, stepDocumentsInjured: stepDocumentsInjured });
    history.push("/step-documents-guilty");
  };
  return (
    <InjuredDocumentsWrapper className="">
      <Progress style={{ marginBottom: 32 }} percent={58} />
      <FancyHeader title="Pasul 7" subtitle="Documente păgubit" />

      <ImagesWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="CI Păgubit"
            setPhotoURI={setIdentityCardPhoto}
            photoURI={identityCardPhoto}
          />
        </ImagePreviewWrapper>
        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Permis conducere păgubit"
            setPhotoURI={setDrivingLicensePhoto}
            photoURI={drivingLicensePhoto}
          />
        </ImagePreviewWrapper>

        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Talon auto avariat"
            setPhotoURI={setAutoHeelPhoto}
            photoURI={autoHeelPhoto}
          />
        </ImagePreviewWrapper>

        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="RCA auto avariat"
            setPhotoURI={setOwnRCAcopyPhoto}
            photoURI={ownRCAcopyPhoto}
          />
        </ImagePreviewWrapper>

        <ImagePreviewWrapper className="ImagePreviewWrapper">
          <ImagePreviewComponent
            icon={<CameraOutlined />}
            title="Imputernicire/procură"
            setPhotoURI={setEmpowermentPhoto}
            photoURI={empowermentPhoto}
          />
        </ImagePreviewWrapper>
      </ImagesWrapper>

      <Button type="primary" onClick={() => addStepDocumentInjured()}>
        Urmatorul pas
      </Button>
    </InjuredDocumentsWrapper>
  );
}
