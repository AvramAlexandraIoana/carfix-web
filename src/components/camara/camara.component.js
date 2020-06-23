import React, { useState, useEffect } from "react";
import { CamaraWrapper, ConfirmationPreviewWrapper, ConfirmationActionWrapper, CamaraHeader, CammeraWrapperOverlay } from "./camara.style";
import { CloseOutlined } from "@ant-design/icons";
import { message, Button } from "antd";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function Camara({
  withPreview,
  setPhotoURI,
  camaraVisible,
  title,
  overlay,
  setCamaraVisible,
  setImagePreviewFullScreenMode,
}) {
  const [dataUri, setDataUri] = useState("");

  const [confirmationPreview, setConfirmationPreview] = useState(false);

  const handleAcceptPhoto = (photoSRC = null) => {
    const uri = photoSRC ? photoSRC : dataUri;

    setImagePreviewFullScreenMode(false);
    setCamaraVisible(false);
    setConfirmationPreview(false);
    setDataUri("");
    setPhotoURI(uri);
  };

  const handleCancelPhoto = () => {
    setDataUri("");
    setConfirmationPreview(false);
    setImagePreviewFullScreenMode(false);
  };

  function onTakePhoto(dataUri) {
    setDataUri(dataUri);
    if (withPreview) {
      setConfirmationPreview(true);
    } else {
      handleAcceptPhoto(dataUri);
    }
  }

  const renderPhotoConfirmation = () => {
    return (
      <ConfirmationPreviewWrapper className="ConfirmationPreviewWrapper">
        <img src={dataUri} />
        <ConfirmationActionWrapper className="ConfirmationActionWrapper">
          <Button onClick={handleCancelPhoto} type="link">
            Refă poza
          </Button>
          <Button onClick={() => handleAcceptPhoto()} shape="round" type="primary">
            OK
          </Button>
        </ConfirmationActionWrapper>
      </ConfirmationPreviewWrapper>
    );
  };

  const renderCamara = () => {
    return (
      <CammeraWrapperOverlay className="CammeraWrapperOverlay">
        <Camera
          onTakePhoto={(dataUri) => {
            onTakePhoto(dataUri);
          }}
        />
      </CammeraWrapperOverlay>
    );
  };

  const handleCloseCamara = () => {
    setImagePreviewFullScreenMode(false);
    setCamaraVisible(false);
  };

  return (
    <CamaraWrapper className="CamaraWrapper">
      <CamaraHeader className="CamaraHeader">
        {title && <span className="camera-title">{title}</span>}
        <Button onClick={handleCloseCamara} icon={<CloseOutlined />} type="link" />
      </CamaraHeader>
      {confirmationPreview ? renderPhotoConfirmation() : renderCamara()}
    </CamaraWrapper>
  );
}
