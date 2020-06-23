import React, { useState, useEffect, useContext } from "react";
import { Descriptions, Carousel, Button, message, Progress } from "antd";
import { StepSummaryWrapper, ImageWrapper } from "./step-summary.styled";
import { FancyHeader } from "../../../../components";
import { AppContext } from "../../../../context/app.context";
import axios from "axios";
import { API_URL } from "../../../../constants";
import { useHistory } from "react-router-dom";

export default function StepSummary() {
  const {
    user,
    setIsLoading,
    isLoading,
    futureTask,
    currentMap2DObject,
    setFutureTask,
    initialFutureTask,
    autoTemplate,
    customStepTemplate,
    setCustomStepTemplate,
  } = useContext(AppContext);
  const history = useHistory();
  const [usedMap2DParts, setUsedMap2DParts] = useState([]);
  const [preparedCarParts, setPreparedCarParts] = useState([]);
  const [preparedAutoTemplate, setPreparedAutoTemplate] = useState([]);
  const [powerUser, setPowerUser] = useState(null);

  useEffect(() => {
    prepareAutoTemplate();
    if (futureTask.type === "FNOL") {
      getPowerUserId(futureTask.stepLocation.judet);
    }

    if (currentMap2DObject) {
      checkUsedMap2DParts();
      console.log("aloo");
    }
  }, []);

  const createNewTask = (formData) => {
    setIsLoading(true);

    axios({
      method: "post",
      url: `${API_URL}/task/create`,
      data: JSON.stringify(formData),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        message.success(`Task-ul ${response.data.message.task_id} a fost creat`);
        history.push("/");
        setCustomStepTemplate(null);
        setFutureTask({ ...initialFutureTask });
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
          console.dir("Repsonse 1252:", response);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });
  };

  const prepareAutoTemplate = () => {
    const futurePreparedAutoTemplate = [];

    autoTemplate.map((generalPart) =>
      futurePreparedAutoTemplate.push({
        id: generalPart.id,
        auto_type_id: generalPart.auto_type_id,
        name: generalPart.description,
        base64: generalPart.generalPhoto,
        longitude: generalPart.longitude,
        latitude: generalPart.latitude,
      })
    );

    setPreparedAutoTemplate(futurePreparedAutoTemplate);
  };

  const checkUsedMap2DParts = () => {
    const template = currentMap2DObject.templates;
    const futureUsedCarParts = template.filter((e) => e.image_url);
    const transformedArray = [];
    futureUsedCarParts.map((part) =>
      transformedArray.push({
        id: Number(part.cupi_id),
        id_label: Number(part.comments.cupi_comment_id),
        name: part.description,
        base64: part.image_url,
        longitude: part.longitude,
        latitude: part.latitude,
        label_xPos: part.comments.x,
        label_yPos: part.comments.y,
      })
    );

    setPreparedCarParts(transformedArray);
    setUsedMap2DParts(futureUsedCarParts);
  };

  const getPowerUserId = (location) => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${API_URL}/county/get-power-user?id=${location}`,
    })
      .then(function (response) {
        //handle success
        setPowerUser(response.data.id);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });
  };

  const prepareTaskRequest = () => {
    const formData = {
      source: "app",
      role: "client",
      task: {
        type: futureTask.type,
        assignee_id: Number(powerUser),
        poweruser_id: Number(powerUser),
        client_id: Number(futureTask.client.id),
        inspector_id: futureTask.type === "IR" ? user.user.id : null,
        car_id: Number(futureTask.car.id),
      },
      custom_step: customStepTemplate,
      form: {
        id_insurance: "1",
        id_insurer: "1",
        policy_number: futureTask.stepPolicy.numar_polita,
        policy_serial: futureTask.stepPolicy.serie_polita,
        guilty_rn: futureTask.stepPolicy.numar_inmatriculare_auto_vinovat,
        event_date: futureTask.stepPolicy.data_eveniment,
        event_time: futureTask.stepPolicy.ora_eveniment,
        amicable: futureTask.stepPolicy.constatare_amiabila_photo ? "1" : "0",
        police_repair: futureTask.stepPolicy.documente_eliberate_politie ? "1" : "0",
        declaring_person: futureTask.stepDeclarant.type_person,
        injured_firstname: futureTask.stepDeclarant.nume,
        injured_lastname: futureTask.stepDeclarant.prenume,
        injured_cnp: futureTask.stepDeclarant.cnp,
        injured_phone: futureTask.stepDeclarant.telefon,
        injured_email: futureTask.stepDeclarant.email,
        guilty_firstname: futureTask.stepGuilty.nume,
        guilty_lastname: futureTask.stepGuilty.prenume,
        guilty_cnp: futureTask.stepGuilty.cnp,
        guilty_phone: futureTask.stepGuilty.telefon,
        guilty_email: futureTask.stepGuilty.email,
        county: Number(futureTask.stepLocation.judet),
        city: futureTask.stepLocation.Oras,
        street: futureTask.stepLocation.adress,
        nr: futureTask.stepLocation.adress_number,
        event_cause_id: "1",
        event_description: futureTask.stepLocation.description,
      },
      documents: {
        injured: [
          {
            name: "ci",
            base64: futureTask.stepDocumentsInjured.identityCardPhoto,
          },
          {
            name: "driving_license",
            base64: futureTask.stepDocumentsInjured.drivingLicensePhoto,
          },
          {
            name: "car_ci",
            base64: futureTask.stepDocumentsInjured.autoHeelPhoto,
          },
          {
            name: "car_rca",
            base64: futureTask.stepDocumentsInjured.ownRCAcopyPhoto,
          },
          {
            name: "empowerment",
            base64: futureTask.stepDocumentsInjured.empowermentPhoto,
          },
        ],
        guilty: [
          {
            name: "ci",
            base64: futureTask.stepDocumentsGuilty.identityCardPhoto,
          },
          {
            name: "driving_license",
            base64: futureTask.stepDocumentsGuilty.drivingLicensePhoto,
          },
          {
            name: "car_ci",
            base64: futureTask.stepDocumentsGuilty.autoHeelPhoto,
          },
          {
            name: "car_rca",
            base64: futureTask.stepDocumentsGuilty.ownRCAcopyPhoto,
          },
        ],
        other: [
          {
            name: "amicable",
            base64: futureTask.stepPolicy.constatare_amiabila_photo,
          },
          {
            name: "police",
            base64: futureTask.stepPolicy.documente_eliberate_politie,
          },
        ],
      },
      car: {
        general: preparedAutoTemplate,
        parts: preparedCarParts,
      },
    };

    createNewTask(formData);
  };

  const renderAutoTemplatePhoto = (id, photo, description) => (
    <ImageWrapper key={id}>
      <span>{description}</span>
      <img src={photo} />
    </ImageWrapper>
  );

  return (
    <StepSummaryWrapper>
      <Progress style={{ marginBottom: 32 }} percent={100} />
      <FancyHeader title="Ai terminat!" subtitle="Vezi ce ai facut" />

      <div>Poze generale</div>

      <Carousel>{autoTemplate.map((photo) => renderAutoTemplatePhoto(photo.id, photo.generalPhoto, photo.description))}</Carousel>

      <div>Poze pieze</div>
      <Carousel>{usedMap2DParts.map((photo) => renderAutoTemplatePhoto(photo.cupi_id, photo.image_url, photo.description))}</Carousel>
      {/* <Descriptions bordered>
        <Descriptions.Item label="Task id">a</Descriptions.Item>
      </Descriptions> */}

      <Button type="primary" loading={isLoading} disabled={isLoading} shape="round" onClick={prepareTaskRequest} block>
        Trimite cerere
      </Button>
    </StepSummaryWrapper>
  );
}
