import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, message, Progress } from "antd";
import { StepInsuranceWrapper } from "./step-insurance.styled";
import { FancyHeader, ImagePreviewComponent } from "../../../../components";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/app.context";
import axios from "axios";
import { API_URL } from "../../../../constants";
const { Option } = Select;

export default function StepInsurance() {
  const history = useHistory();
  const { futureTask, setFutureTask, user, customStepTemplate, setCustomStepTemplate } = useContext(AppContext);
  const [tipAsigurare, setTipAsigurare] = useState([]);
  const [asiguratori, setAsiguratori] = useState([]);

  const [insurancePolicyPhoto, setInsurancePolicyPhoto] = useState(futureTask.stepInsurance.insurance_policy_photo || null);

  const onFinish = (dataForm) => {
    dataForm.insurance_policy_photo = insurancePolicyPhoto;
    setFutureTask({ ...futureTask, stepInsurance: dataForm });
    history.push("/step-damage-policy");
  };

  const checkForCustomStep = (e) => {
    axios({
      method: "get",
      url: `${API_URL}/form/get-tabs?insurer_id=${e}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setCustomStepTemplate(response.data);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/task/get-insurance`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setTipAsigurare(response.data);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
      });

    axios({
      method: "get",
      url: `${API_URL}/task/get-insurer`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setAsiguratori(response.data);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
      });
  }, []);

  const onValuesChange = (changedValues, allValues) => {
    allValues.insurance_policy_photo = insurancePolicyPhoto;
    setFutureTask({ ...futureTask, stepInsurance: allValues });
  };

  return (
    <StepInsuranceWrapper className="StepInsuranceWrapper">
      <Progress style={{ marginBottom: 32 }} percent={8} />
      <FancyHeader title="Pasul 1" subtitle="Despre asigurare si asigurator" />
      <Form
        onValuesChange={onValuesChange}
        size="large"
        hideRequiredMark
        name="basic"
        onFinish={onFinish}
        initialValues={{ ...futureTask.stepInsurance }}
      >
        <Form.Item
          name="insurance_type"
          label="Tip asigurare"
          rules={[{ required: true, message: "Te rugam sa alegi un tip de asigurare" }]}
        >
          <Select placeholder="Alege un tip de asigurare" allowClear>
            {tipAsigurare.map((asigurare) => (
              <Option key={asigurare.id} value={asigurare.id}>
                {asigurare.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="insurer" label="Asigurator" rules={[{ required: true, message: "Te rugam sa alegi un asigurator" }]}>
          <Select
            placeholder="Alege un asigurator"
            allowClear
            showSearch
            onChange={(e) => checkForCustomStep(e)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {asiguratori.map((asigurator) => (
              <Option value={asigurator.id} key={asigurator.id}>
                {asigurator.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="insurance_policy_photo" label="Asigurator">
          <ImagePreviewComponent title="Polita de asigurare" setPhotoURI={setInsurancePolicyPhoto} photoURI={insurancePolicyPhoto} />
        </Form.Item>

        <Form.Item className="submit_button">
          <Button
            shape="round"
            block
            type="primary"
            // disabled={!insurancePolicyPhoto}
            htmlType="submit"
          >
            Urmatorul pas
          </Button>
        </Form.Item>
      </Form>
    </StepInsuranceWrapper>
  );
}
