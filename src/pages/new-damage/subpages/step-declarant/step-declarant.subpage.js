import React, { useState, useContext } from "react";
import { FancyHeader, ImagePreviewComponent } from "../../../../components";
import { Form, Button, Input, Select, Progress } from "antd";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/app.context";
import { StepDeclarantWrapper } from "./step-declarant.styled";
const { Option } = Select;

export default function StepDeclarant() {
  const history = useHistory();
  const { futureTask, setFutureTask } = useContext(AppContext);

  const [imputernicireProcura, setImputernicireProcura] = useState(futureTask.stepDeclarant.imputernicireProcura || null);
  const [cardID, setCardID] = useState(futureTask.stepDeclarant.cardID || null);

  const [showInputernicireProcura, setShowInputernicireProcura] = useState(false);

  const onFinish = (dataForm) => {
    dataForm.imputernicireProcura = imputernicireProcura;
    dataForm.cardID = cardID;
    setFutureTask({ ...futureTask, stepDeclarant: dataForm });
    history.push("/step-guilty");
  };

  const onValuesChange = (changedValues, allValues) => {
    allValues.imputernicireProcura = imputernicireProcura;
    allValues.cardID = cardID;
    setFutureTask({ ...futureTask, stepDeclarant: allValues });
  };

  return (
    <StepDeclarantWrapper>
      <Progress style={{ marginBottom: 32 }} percent={24.4} />
      <FancyHeader title="Pasul 3" subtitle="Detalii despre declarant" />
      <Form
        onValuesChange={onValuesChange}
        size="large"
        initialValues={{ ...futureTask.stepDeclarant }}
        hideRequiredMark
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          name="type_person"
          label="Persoana care declara dauna este"
          rules={[{ required: true, message: "Te rog sa spui ce tip de persoana esti" }]}
        >
          <Select
            onChange={(e) => {
              if (e == 2) {
                setShowInputernicireProcura(true);
              } else {
                setShowInputernicireProcura(false);
                setImputernicireProcura(null);
              }
            }}
            placeholder="Alege un tip persoana"
            allowClear
          >
            <Option value="1">Pagubit</Option>
            <Option value="2">Imputernicit</Option>
          </Select>
        </Form.Item>

        {showInputernicireProcura && (
          <Form.Item name="imputernicireProcura" label="Te rog sa incarci poza cu imputernicirea sau procura">
            <ImagePreviewComponent title="Imputernicirea / Procura" setPhotoURI={setImputernicireProcura} photoURI={imputernicireProcura} />
          </Form.Item>
        )}

        <Form.Item
          name="nume"
          label="Nume declarant"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci numele",
            },
          ]}
        >
          <Input autoComplete="family-name" placeholder="Popescu" />
        </Form.Item>

        <Form.Item
          name="prenume"
          label="Prenume declarant"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci prenumele",
            },
          ]}
        >
          <Input autoComplete="given-name" placeholder="Ion" />
        </Form.Item>

        <Form.Item
          name="cnp"
          label="CNP declarant"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci cnp-ul",
            },
          ]}
        >
          <Input placeholder="2940513435638" />
        </Form.Item>

        <Form.Item
          name="telefon"
          label="Telefon declarant"
          rules={[
            {
              required: true,
              message: "Te rugam sa introduci numarul de telefon",
            },
          ]}
        >
          <Input autoComplete="tel" placeholder="0712345678" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email declarant"
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
          <Input autoComplete="email" placeholder="ionpopescu@email.com" />
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
    </StepDeclarantWrapper>
  );
}
