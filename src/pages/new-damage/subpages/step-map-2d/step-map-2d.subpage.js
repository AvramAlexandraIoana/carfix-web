import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import { AppContext } from "../../../../context/app.context";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, Spin, Progress } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  Map2DWrapper,
  CarMapWrapper,
  PreviewPhotoWrapper,
  PreviewPhotoHeader,
  CommentTag,
  ConfirmationActionWrapper,
  ButtonWrapper,
  ImageWrapper,
  ConfirmationPreviewWrapper,
} from "./step-map-2d.styled";
import { CommentsCamara, FancyHeader } from "../../../../components";
import { useHistory } from "react-router-dom";

export default function StepMap2D() {
  const { user, getCupiTemplate, currentMap2DObject, futureTask,  setCurrentMap2DObject, isLoading } = useContext(AppContext);

  const history = useHistory();
  const { height, width } = useWindowDimensions();
  const carImageRef = useRef(null);
  const [shouldRenderMap2D, setShouldRenderMap2D] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  const [previewPhotoVisible, setPreviewPhotoVisible] = useState(false);

  const [camaraVisible, setCamaraVisible] = useState(null);
  const [userPos, setUserPos] = useState({longitude: null, latitude: null});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => setUserPos(e.coords));
  }, []);

  useEffect(() => {
    getCupiTemplate(user.jwt, futureTask.car.type_id);
  }, []);

  useEffect(() => {
    if (carImageRef.current) {
      setShouldRenderMap2D(true);
    }
  }, [carImageRef.current]);

  if (!currentMap2DObject) {
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
  const { templates, carImage } = currentMap2DObject;

  const preparePoints = (points) => {
    console.log(templates);
    const { clientHeight, clientWidth } = carImageRef.current;
    if (!points) return;
    const data = points.split(" ");
    let result = "";
    data.forEach((coord) => {
      const point = coord.split(",");
      const x = +parseFloat(clientWidth / parseFloat(point[0]).toFixed(4)).toFixed(0);
      const y = +parseFloat(clientHeight / parseFloat(point[1]).toFixed(4)).toFixed(0);
      result += `${x}, ${y} `;
    });
    return result;
  };

  const handlePolygonClick = (polygon) => {
    setCurrentPart(polygon);

    if (polygon.image_url) {
      setPreviewPhotoVisible(true);
    } else {
      setCamaraVisible(true);
    }
  };

  const renderMap2D = () => {
    return (
      <svg>
        {templates && templates.map((polygon) => {
          return (
            <polygon
              onClick={() => {
                handlePolygonClick(polygon);
              }}
              opacity={polygon.image_url ? 0.6 : 0.1}
              key={polygon.cupi_id}
              points={preparePoints(polygon.points)}
            />
          );
        })}
      </svg>
    );
  };

  const renderCarImage = () => {
    return <img ref={carImageRef} src={carImage} />;
  };

  if (isLoading) {
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

  const setPhotoInTemplate = (photoURI) => {
    const futureMap2DObject = currentMap2DObject;

    let partIndex;
    futureMap2DObject.templates.map((part, index) => {
      if (part.cupi_id == currentPart.cupi_id) {
        partIndex = index;
      }
    });
    futureMap2DObject.templates[partIndex].image_url = photoURI;
    futureMap2DObject.templates[partIndex].longitude = `${userPos.longitude}`;
    futureMap2DObject.templates[partIndex].latitude = `${userPos.latitude}`;
    setCurrentMap2DObject(futureMap2DObject);
  };

  const deletePhotoFromTempalte = () => {
    const futureMap2DObject = currentMap2DObject;

    let partIndex;
    futureMap2DObject.templates.map((part, index) => {
      if (part.cupi_id == currentPart.cupi_id) {
        partIndex = index;
      }
    });

    futureMap2DObject.templates[partIndex].image_url = null;
    futureMap2DObject.templates[partIndex].comments = null;
    setCurrentMap2DObject(futureMap2DObject);
  };

  const renderPreviewPhoto = () => {
    return (
      <PreviewPhotoWrapper className="PreviewPhotoWrapper">
        <PreviewPhotoHeader className="PreviewPhotoHeader">
          <span className="camera-title">{currentPart.description}</span>
          <Button onClick={() => setPreviewPhotoVisible(false)} icon={<CloseOutlined />} type="link" />
        </PreviewPhotoHeader>
        <ConfirmationPreviewWrapper className="ConfirmationPreviewWrapper">
          <ImageWrapper className="ImageWrapper Step2D">
            <img src={currentPart.image_url} />

            <CommentTag
              style={{
                position: "absolute",
                left: `${currentPart.comments.x}%`,
                top: `${currentPart.comments.y}%`,
              }}
            >
              {currentPart.comments.description}
            </CommentTag>
          </ImageWrapper>
          <ConfirmationActionWrapper className="ConfirmationActionWrapper">
            <Button
              onClick={() => {
                deletePhotoFromTempalte();
                setPreviewPhotoVisible(false);
              }}
              type="link"
            >
              Sterge poza
            </Button>
            <Button
              onClick={() => {
                setCurrentPart(currentPart);
                setCamaraVisible(true);
                setPreviewPhotoVisible(false);
              }}
              shape="round"
              type="primary"
            >
              Refă poza
            </Button>
          </ConfirmationActionWrapper>
        </ConfirmationPreviewWrapper>
      </PreviewPhotoWrapper>
    );
  };

  return (
    <Map2DWrapper className="Map2DWrapper">
      {previewPhotoVisible && renderPreviewPhoto()}

      {camaraVisible && (
        <CommentsCamara
          title={currentPart.description}
          needComment
          carPart={currentPart}
          setPhotoURI={(photoURI) => setPhotoInTemplate(photoURI)}
          camaraVisible={camaraVisible}
          setCamaraVisible={setCamaraVisible}
          setImagePreviewFullScreenMode={(e) => console.log(e)}
        />
      )}
      <CarMapWrapper className="CarMapWrapper">
        <TransformWrapper defaultScale={1} defaultPositionX={0} defaultPositionY={0}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <TransformComponent>
                {renderCarImage()}
                {carImageRef.current && renderMap2D()}
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </CarMapWrapper>

      <ButtonWrapper className="ButtonWrapper">
        <Button onClick={() => history.push("/step-general-photos")} type="primary" block shape="round">
          Urmatorul pas
        </Button>
      </ButtonWrapper>
    </Map2DWrapper>
  );
}
