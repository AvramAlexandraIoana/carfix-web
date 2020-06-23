import React, { useState, useContext, useEffect } from "react";
import { Task, FancyHeader, CommentsCamara, DocumentListItem } from "../../components";
import { AppContext } from "../../context/app.context";
import { useLocation } from "react-router-dom";
import { Descriptions, Carousel, Button, message, Spin } from "antd";
import {
  TaskPageWrapper,
  ImageWrapper,
  BadPhotoOverlayWrapper,
  LoadingWrapper,
  ApprovedPhotoOverlayWrapper,
  LabelWrapper,
} from "./task.styled";
import axios from "axios";
import { API_URL } from "../../constants";

export default function TaskPage(props) {
  let location = useLocation();
  const { isLoading, tasks, user, getTasks, currentDetailTask, setCurrentDetailTask } = useContext(AppContext);
  const [task, setTask] = useState(null);

  //   const task = props.state.task;
  const [generalPhotos, setGeneralPhotos] = useState([]);
  const [cupiPhotos, setCupiPhotos] = useState([]);

  const [documentFromFormPhoto, setDocumentFromFormPhoto] = useState([]);
  const [photoToBeEdited, setPhotoToBeEdited] = useState(null);
  const [commentsCamaraVisible, setCommentsCamaraVisible] = useState(false);

  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!task) {
      fetchTask();
    }

    if (task) {
      organizePhoto();
    }
  }, [task]);

  const fetchDocuments = () => {
    axios({
      method: "get",
      url: `${API_URL}/task/documents?task_id=${location.search.substring(4)}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setDocuments(response.data.documents);
        console.log("documents", response.data.documents);
      })
      .catch(function (response) {
        //handle error
        console.dir(response);
      });
  };

  const fetchTask = () => {
    const bodyFormData = new FormData();
    bodyFormData.set("id", location.search.substring(4));
    axios({
      method: "post",
      url: `${API_URL}/task/get-task`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setTask(response.data);
        setCurrentDetailTask(response.data);
        if (response.data.task_status.code === "STATE_APPROVED") {
          fetchDocuments();
        }
      })
      .catch(function (response) {
        //handle error
        console.dir(response);
      });
  };

  const organizePhoto = () => {
    let futureGeneralPhotos = [];
    let futureCupiPhotos = [];
    let futureDocumentsPhotos = [];

    photos.map((photo) => {
      if (photo.category_id === 4) {
        futureGeneralPhotos.push(photo);
      }
      if (photo.category_id === 5) {
        futureCupiPhotos.push(photo);
      }
      if (photo.category_id === 1 || photo.category_id === 2) {
        futureDocumentsPhotos.push(photo);
      }
    });

    setDocumentFromFormPhoto(futureDocumentsPhotos);
    setCupiPhotos(futureCupiPhotos);
    setGeneralPhotos(futureGeneralPhotos);
  };

  const renderBadPhotoOverlay = (photo) => {
    return (
      <BadPhotoOverlayWrapper className="BadPhotoOverlayWrapper">
        <h2>Poză refuzată</h2>

        <Button
          onClick={() => {
            setPhotoToBeEdited(photo);
            setCommentsCamaraVisible(true);
          }}
          type="primary"
          shape="round"
        >
          Refă poza
        </Button>
      </BadPhotoOverlayWrapper>
    );
  };
  const renderApprovedPhotoOverlay = (photo) => {
    return (
      <ApprovedPhotoOverlayWrapper>
        <h2>Poză acceptata</h2>
      </ApprovedPhotoOverlayWrapper>
    );
  };

  const sendPhoto = (photoURI) => {
    const bodyFormData = new FormData();
    bodyFormData.set("id", photoToBeEdited.id);
    bodyFormData.set("base64", photoURI);

    axios({
      method: "post",
      url: `${API_URL}/task-photo/update-photo`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        fetchTask();
        getTasks(user.jwt);
        message.success("Poza a fost schimbată");
      })
      .catch(function (response) {
        //handle error
        console.dir(response);
      });
  };

  const renderGeneralPhoto = (photo) => {
    return (
      <ImageWrapper key={photo.id}>
        {photo.status == "rejected" && renderBadPhotoOverlay()}
        <img src={photo.uri} />
        <LabelWrapper>{photo.name}</LabelWrapper>
      </ImageWrapper>
    );
  };

  const renderCupiPhoto = (photo) => {
    return (
      <ImageWrapper key={photo.id}>
        {photo.status == "rejected" && renderBadPhotoOverlay(photo)}
        <img src={photo.uri} />
        <span
          className="CommentLabel"
          style={{
            top: `${photo.comment.coords.top}%`,
            left: `${photo.comment.coords.left}%`,
          }}
        >
          {photo.comment.label}
        </span>
        <LabelWrapper>{photo.name}</LabelWrapper>
      </ImageWrapper>
    );
  };

  if (!task) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }

  const {
    car_make,
    car_model,
    car_registration_number,
    created_at,
    task_asignee,
    task_id,
    photos,
    task_client,
    task_status,
    task_type,
  } = task;

  return (
    <TaskPageWrapper>
      <FancyHeader title={`Task #${task_id}`} subtitle={`Detalii despre task-ul #${task_id}`} />

      {commentsCamaraVisible && (
        <CommentsCamara
          title={"test"}
          needComment
          editMode
          carPart={photoToBeEdited}
          setPhotoURI={(photoURI) => {
            sendPhoto(photoURI);
          }}
          camaraVisible={commentsCamaraVisible}
          setCamaraVisible={setCommentsCamaraVisible}
          setImagePreviewFullScreenMode={(e) => console.log(e)}
        />
      )}

      {documents && documents.map((document) => <DocumentListItem document={document} key={document.fileName} />)}

      {generalPhotos.length > 0 && <h2>GENERAL</h2>}
      <Carousel>{generalPhotos.map((photo) => renderGeneralPhoto(photo))}</Carousel>

      {cupiPhotos.length > 0 && <h2>PIESE</h2>}
      <Carousel>{cupiPhotos.map((photo) => renderCupiPhoto(photo))}</Carousel>

      {documentFromFormPhoto.length > 0 && <h2>Documente</h2>}
      <Carousel>{documentFromFormPhoto.map((photo) => renderGeneralPhoto(photo))}</Carousel>

      <Descriptions bordered>
        <Descriptions.Item label="Task id">{task_id}</Descriptions.Item>
        <Descriptions.Item label="Task type">{task_type}</Descriptions.Item>
        <Descriptions.Item label="Car make">{car_make}</Descriptions.Item>
        <Descriptions.Item label="Car model">{car_model}</Descriptions.Item>
        <Descriptions.Item label="Register number">{car_registration_number}</Descriptions.Item>
        <Descriptions.Item label="Create at">{created_at}</Descriptions.Item>
        <Descriptions.Item label="Task asignee">{task_asignee.name}</Descriptions.Item>
        <Descriptions.Item label="Task client">{task_client.name}</Descriptions.Item>
        <Descriptions.Item label="Task status">{task_status.name}</Descriptions.Item>
      </Descriptions>
    </TaskPageWrapper>
  );
}
