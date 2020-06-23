import React, { useState, useEffect } from "react";
import { Camara } from "../../components";
import { ImageFullScreenWrapper, ImageThumbnailWrapper, ImageFullScreenHeader, ImageFullScreenActionWrapper, IconWrapper } from "./image-preview.style";
import { Button } from "antd";
import { CloseOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { CameraOutlined } from "@ant-design/icons";

export default function ImagePreviewComponent({ withPreview, fullScreen, photoURI, setPhotoURI, icon, title, overflowPhoto, withCheckbox }) {
  const [isFullScreenMode, setIsFullScreenMode] = useState(fullScreen);
  const [camaraVisible, setCamaraVisible] = useState(false);
  const [canRenderCamera, setCanRenderCamera] = useState(false);

  const handleRetakePhoto = () => {
    setPhotoURI(null);
    setCamaraVisible(true);
  };

  useEffect(() => {
    if (camaraVisible) {
      setCanRenderCamera(true);
    } else {
      setCanRenderCamera(false);
    }
  }, [camaraVisible]);
  const renderFullScreenPreview = () => {
    return (
      <ImageFullScreenWrapper className="ImageFullScreenWrapper">
        <ImageFullScreenHeader>
          {title && <span>{title}</span>}
          <Button onClick={() => setIsFullScreenMode(false)} icon={<CloseOutlined />} type="link" />
        </ImageFullScreenHeader>
        <img src={photoURI} />

        <ImageFullScreenActionWrapper className="ImageFullScreenActionWrapper">
          <Button type="link" onClick={() => setPhotoURI(null)}>
            Sterge poza
          </Button>
          <Button onClick={handleRetakePhoto} shape="round" type="primary">
            Refă poza
          </Button>
        </ImageFullScreenActionWrapper>
      </ImageFullScreenWrapper>
    );
  };
  const renderThumbnailPreview = () => {
    return (
      <ImageThumbnailWrapper className="ImageThumbnailWrapper" onClick={() => setIsFullScreenMode(true)}>
        <img src={photoURI} />
        {title && <span className="ImageTitle">{title}</span>}

        {withCheckbox  && <span className="ImageTitle">	<IconWrapper>
							<CheckCircleOutlined /> 
						</IconWrapper></span>}
      </ImageThumbnailWrapper>
    );
  };

  const renderEmptyPreview = () => {
    return (
      <ImageThumbnailWrapper
        className="ImageThumbnailWrapper"
        onClick={() => {
          setCamaraVisible(true);
        }}
      >
        {overflowPhoto && <img style={{ position: "absolute", top: 0, opacity: 0.5 }} src={overflowPhoto} />}

        {!overflowPhoto ? icon ? icon : <CameraOutlined /> : null}
        {!withCheckbox && title && <span className="ImageTitle">{title}</span>}
        {withCheckbox &&   <span className="ImageTitle"> <CameraOutlined /></span>}
      </ImageThumbnailWrapper>
    );
  };

  if (canRenderCamera) {
    return (
      <Camara
        isSilentMode
        withPreview={withPreview ? true : false}
        overlay={overflowPhoto}
        title={title}
        idealFacingMode="FACING_MODES.ENVIRONMENT"
        setImagePreviewFullScreenMode={setIsFullScreenMode}
        setPhotoURI={setPhotoURI}
        camaraVisible={camaraVisible}
        setCamaraVisible={setCamaraVisible}
      />
    );
  }

  if (photoURI === null) {
    return renderEmptyPreview();
  }

  return isFullScreenMode ? renderFullScreenPreview() : renderThumbnailPreview();
}
