import React, { useState, useEffect, useContext, useRef } from "react";
import {
  CamaraWrapper,
  ConfirmationPreviewWrapper,
  ConfirmationActionWrapper,
  CamaraHeader,
  OptionWrapper,
  TutorialWrapper,
  CommentTag,
  ImageWrapper,
  SelectorWrapper,
} from "./comments-camara.styled";
import { CloseOutlined } from "@ant-design/icons";
import { message, Button } from "antd";
import { API_URL } from "../../constants";
import { AppContext } from "../../context/app.context";
import axios from "axios";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { FancyHeader } from "..";

export default function CommentsCamara({
  setPhotoURI,
  camaraVisible,
  title,
  editMode,
  carPart,
  setCamaraVisible,
  setImagePreviewFullScreenMode,
}) {
  const [dataUri, setDataUri] = useState("");
  const { user, currentMap2DObject, setCurrentMap2DObject } = useContext(AppContext);

  const [confirmationPreview, setConfirmationPreview] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [tutorialVisible, setTutorialVisible] = useState(true);

  useEffect(() => {
    const bodyFormData = new FormData();
    bodyFormData.set("cupi_part_id", carPart.cupi_id);

    axios({
      method: "post",
      url: `${API_URL}/inspection/cupi-comments`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setCommentsList(response.data.message.comments);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1251:", response);
        }
      });
  }, []);

  const setCommentInTemplate = () => {
    const futureMap2DObject = currentMap2DObject;
    let partIndex;
    futureMap2DObject.templates.map((part, index) => {
      if (part.cupi_id == carPart.cupi_id) {
        partIndex = index;
      }
    });

    futureMap2DObject.templates[partIndex].comments = {
      x: commentPosX,
      y: commentPosY,
      cupi_comment_id: currentComment.cupi_comment_id,
      description: currentComment.description,
    };

    setCurrentMap2DObject(futureMap2DObject);
  };

  const handleAcceptPhoto = () => {
    setCommentInTemplate();
    setImagePreviewFullScreenMode(false);
    setCamaraVisible(false);
    setPhotoURI(dataUri);
  };

  const handleAcceptPhotoOnEdit = () => {
    setPhotoURI(dataUri);
    setImagePreviewFullScreenMode(false);
    setCamaraVisible(false);
  };

  function onTakePhoto(dataUri) {
    setDataUri(dataUri);
    setConfirmationPreview(true);
  }

  const renderPhotoCommentSelector = () => {
    return (
      <ConfirmationPreviewWrapper className="ConfirmationPreviewWrapper">
        <img src={dataUri} />

        <SelectorWrapper className="SelectorWrapper fadeInUp animated faster">
          {commentsList.length > 0 ? <h2>Alege ceva</h2> : <h2>Incarcam lista</h2>}
          {commentsList.map((comment) => (
            <OptionWrapper
              onClick={() => {
                setConfirmationPreview(false);
                setCurrentComment(comment);
              }}
            >
              {comment.description}
            </OptionWrapper>
          ))}
        </SelectorWrapper>
      </ConfirmationPreviewWrapper>
    );
  };

  const [commentPosX, setCommentPosX] = useState(0);
  const [commentPosY, setCommentPosY] = useState(0);

  const renderTutorial = () => (
    <TutorialWrapper className="TutorialWrapper">
      <img src="https://cdn3.iconfinder.com/data/icons/hand-gesture-10/64/Tap_hand_gesture_finger_click-512.png" />

      <FancyHeader title="Indica zona" subtitle="Indica zona avariata cu un click pe ecran" />

      <Button
        type="primary"
        shape="round"
        block
        onClick={() => {
          setTutorialVisible(false);
        }}
      >
        Am inteles
      </Button>
    </TutorialWrapper>
  );
  const renderCommentPosition = () => {
    return (
      <ConfirmationPreviewWrapper className="ConfirmationPreviewWrapper">
        {tutorialVisible && renderTutorial()}
        <ImageWrapper className="ImageWrapper" id="MAFIA">
          <img
            onClick={(e) => {
              let percentX = (e.nativeEvent.offsetX * 100) / e.currentTarget.clientWidth;
              let percentY = (e.nativeEvent.offsetY * 100) / e.currentTarget.clientHeight;

              setCommentPosX(percentX);
              setCommentPosY(percentY);
            }}
            src={dataUri}
          />

          {commentPosY && commentPosY ? (
            <CommentTag
              style={{
                top: `${commentPosY}%`,
                left: `${commentPosX}%`,
              }}
            >
              {currentComment.description}
            </CommentTag>
          ) : null}
        </ImageWrapper>

        {commentPosY && commentPosY ? (
          <ConfirmationActionWrapper>
            <Button
              onClick={() => {
                setConfirmationPreview(true);
                setCurrentComment(null);
              }}
              type="link"
            >
              Alege alta eticheta
            </Button>
            <Button onClick={() => (editMode ? handleAcceptPhotoOnEdit() : handleAcceptPhoto())} shape="round" type="primary">
              {editMode ? "Schimba poza" : "OK"}
            </Button>
          </ConfirmationActionWrapper>
        ) : null}
      </ConfirmationPreviewWrapper>
    );
  };

  const [cordovaCameraVisible, setCordovaCameraVisible] = useState(false);

  const openCordovaCamera = () => {
    if (cordovaCameraVisible) {
      return null;
    }

    setCordovaCameraVisible(true);
    if (window.cordova) {
      navigator.camera.getPicture(
        (image) => {
          onTakePhoto("data:image/jpeg;base64," + image);
        },
        () => {
          setConfirmationPreview(false);
          setImagePreviewFullScreenMode(false);
        },
        { quality: 50, destinationType: 0, correctOrientation: true }
      );
    }
  };

  const hideCordovaCamera = () => {
    document.querySelectorAll(".cordova-camera-capture").forEach((e) => e.remove());
  };

  const renderCamara = () => {
    return (
      <Camera
        onTakePhoto={(dataUri) => {
          onTakePhoto(dataUri);
        }}
      />
    );
  };

  const handleCloseCamara = () => {
    hideCordovaCamera();
    setImagePreviewFullScreenMode(false);
    setCamaraVisible(false);
  };

  const renderConditional = () => {
    if (confirmationPreview) {
      return renderPhotoCommentSelector();
    }

    if (currentComment) {
      return renderCommentPosition();
    }

    return renderCamara();
  };
  return (
    <CamaraWrapper className="CamaraWrapper">
      <CamaraHeader className="CamaraHeader">
        {title && <span className="camera-title">{title}</span>}
        <Button onClick={handleCloseCamara} icon={<CloseOutlined />} type="link" />
      </CamaraHeader>
      {renderConditional()}
    </CamaraWrapper>
  );
}
