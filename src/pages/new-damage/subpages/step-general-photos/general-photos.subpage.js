import React, { useState, useContext, useEffect, useReducer } from "react";
import { FancyHeader, ImagePreviewComponent } from "../../../../components";

import { StepGeneralPhotosWrapper, ImagePreviewWrapper, ImagesWrapper, IconWrapper, LabelWrapper } from "./general-photos.styled";
import { AppContext } from "../../../../context/app.context";
import { Button, Spin, Progress, Form } from "antd";
import { useHistory } from "react-router-dom";

export default function StepGeneralPhotos() {
  const { getAutoTemplate, autoTemplate, setAutoTemplate, futureTask, customStepTemplate } = useContext(AppContext);
  const [canContinue, setCanContinue] = useState(false);
  const [userPos, setUserPos] = useState({ longitude: null, latitude: null });

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const history = useHistory();

  // Geolocation
  const onSuccess = (position) => {
    setUserPos(position.coords);
  };

  // Geolocation
  const onError = (error) => {
    window.alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    getAutoTemplate(futureTask.car.type_id);
  }, []);

  const setGeneralPhoto = (index, photoURI) => {
    const futureAutoTemplate = autoTemplate;
    futureAutoTemplate[index].generalPhoto = photoURI;
    futureAutoTemplate[index].longitude = `${userPos.longitude}`;
    futureAutoTemplate[index].latitude = `${userPos.latitude}`;

    setAutoTemplate(futureAutoTemplate);

    // Check if all photos are there
    const localCanContinue = futureAutoTemplate.every((template) => template.generalPhoto);
    setCanContinue(localCanContinue);

    // Error on cordova mobile
    forceUpdate();
  };

  if (!autoTemplate) {
    return (
      <div
        style={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <StepGeneralPhotosWrapper>
      <Progress style={{ marginBottom: 32 }} percent={91.6} />
      <FancyHeader title="Pasul 11" subtitle="Pozele generale" />
      <ImagesWrapper>
        {autoTemplate.map((template, index) => {
          console.log(template);
          return (
            <ImagePreviewWrapper key={template.id} className="ImagePreviewWrapper">
              <Form.Item>
                <LabelWrapper>{template.description}</LabelWrapper>
                <ImagePreviewComponent
                      withCheckbox
                      overflowPhoto={template.image_url}
                      title={template.description}
                      withPreview={false}
                      setPhotoURI={(photoURI) => setGeneralPhoto(index, photoURI)}
                      photoURI={template.generalPhoto ? template.generalPhoto : null}/>
              </Form.Item>
            </ImagePreviewWrapper>
          );
        })}
      </ImagesWrapper>

      <Button
        type="primary"
        onClick={() => {
          if (customStepTemplate) {
            history.push("./step-custom");
          } else {
            history.push("./step-summary");
          }
        }}
        disabled={!canContinue}
        block
        shape="round"
      >
        Urmatorul pas
      </Button>
    </StepGeneralPhotosWrapper>
  );
}
