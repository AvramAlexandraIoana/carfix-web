import React, { useState, useContext, useEffect, useRef } from "react";
import { FancyHeader, ImagePreviewComponent } from "../../../../components";
import { Form, Button, Input, Select, Progress } from "antd";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/app.context";
import { StepGuiltyWrapper } from "./step-guilty.styled";
import { useForceUpdate } from "../../../hooks/useForceUpdate";
const { Option } = Select;

export default function StepGuilty() {
  const history = useHistory();
  const { futureTask, setFutureTask } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState({ ...futureTask.stepGuilty });
  const [cardID, setCardID] = useState(futureTask.stepGuilty.cardID || null);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.resetFields();
  }, [initialValues]);

  const onFinish = (dataForm) => {
    dataForm.cardID = cardID;
    setFutureTask({ ...futureTask, stepGuilty: dataForm });
    history.push("/step-location");
  };

  const handlePersonTypeChange = (e) => {
    console.log(e === "imputernicit");
    if (e === "imputernicit") {
      setInitialValues({ ...futureTask.stepDeclarant, type_person: "imputernicit" });
      setCardID(futureTask.stepDeclarant.cardID);
    } else if (e === "propietar") {
      setInitialValues({ type_person: "propietar" });
      setCardID(null);
    } else {
      setInitialValues({ type_person: "alta" });
      setCardID(null);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    allValues.cardID = cardID;
    setFutureTask({ ...futureTask, stepGuilty: allValues });
  };

  return (
    initialValues && (
      <StepGuiltyWrapper>
        <Progress style={{ marginBottom: 32 }} percent={32.8} />
        <FancyHeader title="Pasul 4" subtitle="Detalii despre vinovat" />
        <Form
          onValuesChange={onValuesChange}
          size="large"
          initialValues={initialValues}
          hideRequiredMark
          ref={formRef}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            size="large"
            name="type_person"
            label="Datele persoanei vinovate"
            rules={[{ required: true, message: "Te rog sa spui cine este vinovatul" }]}
          >
            <Select onChange={handlePersonTypeChange} placeholder="Cine este vinovat?" allowClear>
              <Option value="propietar">Propietar</Option>
              <Option value="imputernicit">Declarant</Option>
              <Option value="alta">Alta persoana</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="nume"
            label="Nume vinovat"
            rules={[
              {
                required: true,
                message: "Te rugam sa introduci numele",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="Popescu" />
          </Form.Item>

          <Form.Item
            name="prenume"
            label="Prenume vinovat"
            rules={[
              {
                required: true,
                message: "Te rugam sa introduci prenumele",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="Ion" />
          </Form.Item>

          <Form.Item
            name="cnp"
            label="CNP vinovat"
            rules={[
              {
                required: true,
                message: "Te rugam sa introduci cnp-ul",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="2940513435638" />
          </Form.Item>

          <Form.Item
            name="telefon"
            label="Telefon vinovat"
            rules={[
              {
                required: true,
                message: "Te rugam sa introduci numarul de telefon",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="0712345678" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email vinovat"
            rules={[
              {
                type: "email",
                message: "Email-ul nu e valid",
              },
              {
                required: true,
                message: "Te rugam sa introduci email-ul",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="ionpopescu@email.com" />
          </Form.Item>

          <Form.Item name="cardID" label="Te rog sa incarci poza cu cartea de identitate">
            <ImagePreviewComponent title="Carte de identitate" setPhotoURI={setCardID} photoURI={cardID} />
          </Form.Item>

          <Form.Item>
            <Button block shape="round" type="primary" htmlType="submit">
              Urmatorul pas
            </Button>
          </Form.Item>
        </Form>
      </StepGuiltyWrapper>
    )
  );
}
