import React, { useState, useContext } from "react";
import { FancyHeader, ImagePreviewComponent } from "../../../../components";
import { Form, Button, Input, DatePicker, Progress } from "antd";
import { StepPolicyWrapper } from "./step-policy.styled";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/app.context";
import { TimePicker } from "antd";
import moment from "moment";
const format = "HH:mm";

export default function StepPolicy() {
  const history = useHistory();
  const { futureTask, setFutureTask } = useContext(AppContext);

  const [constatareAmiabilaPhoto, setConstatareAmiabilaPhoto] = useState(futureTask.stepPolicy.constatare_amiabila_photo || null);

  const [documenteEliberatePolitie, setDocumenteEliberatePolitie] = useState(futureTask.stepPolicy.documente_eliberate_politie || null);

  const onFinish = (dataForm) => {
    dataForm.constatare_amiabila_photo = constatareAmiabilaPhoto;
    dataForm.documente_eliberate_politie = documenteEliberatePolitie;
    setFutureTask({ ...futureTask, stepPolicy: dataForm });
    history.push("/step-declarant");
  };

  const onValuesChange = (changedFields, allFields) => {
    allFields.constatare_amiabila_photo = constatareAmiabilaPhoto;
    allFields.documente_eliberate_politie = documenteEliberatePolitie;
    setFutureTask({ ...futureTask, stepPolicy: allFields });
  };

  return (
    <StepPolicyWrapper>
      <Progress style={{ marginBottom: 32 }} percent={16} />
      <FancyHeader title="Pasul 2" subtitle="Detalii despre dauna" />
      <Form
        onValuesChange={onValuesChange}
        size="large"
        initialValues={{ ...futureTask.stepPolicy }}
        hideRequiredMark
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item name="numar_polita" label="Numar polita" rules={[{ required: true, message: "Te rugam sa introduci numar polita" }]}>
          <Input placeholder="Exemplu: 10xxxxxx" />
        </Form.Item>

        <Form.Item name="serie_polita" label="Serie polita" rules={[{ required: true, message: "Te rugam sa introduci serie polita" }]}>
          <Input placeholder="JH4DB7560SS00XXXX" />
        </Form.Item>

        <Form.Item
          name="numar_inmatriculare_auto_vinovat"
          label="Numar inmatriculare auto vinovat"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci numarul de inmatriculare auto vinovat",
            },
          ]}
        >
          <Input placeholder="B 123 ABC" />
        </Form.Item>

        <Form.Item
          name="data_eveniment"
          label="Data eveniment"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci data eveniment",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="ora_eveniment"
          label="Ora eveniment"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci ora evenimentului",
            },
          ]}
        >
          <TimePicker style={{ width: "100%" }} format={format} />
        </Form.Item>

        <Form.Item name="constatare_amiabila_photo" label="Incarca poza daca ai semnat constatarea amiabila">
          <ImagePreviewComponent title="Constatare amiabila" setPhotoURI={setConstatareAmiabilaPhoto} photoURI={constatareAmiabilaPhoto} />
        </Form.Item>

        <Form.Item name="documente_eliberate_politie" label="Incarca poza daca esti in posesia documentelor eliberate de politie">
          <ImagePreviewComponent
            title="Documente eliberate de politie"
            setPhotoURI={setDocumenteEliberatePolitie}
            photoURI={documenteEliberatePolitie}
          />
        </Form.Item>
        <Form.Item>
          <Button block shape="round" type="primary" htmlType="submit">
            Urmatorul pas
          </Button>
        </Form.Item>
      </Form>
    </StepPolicyWrapper>
  );
}
