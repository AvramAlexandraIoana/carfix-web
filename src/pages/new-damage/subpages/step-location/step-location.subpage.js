import React, { useEffect, useContext, useState } from "react";

import { StepLocationWrapper } from "./step-location.styled";
import { FancyHeader } from "../../../../components";

import { Form, Input, Button, Select, message, Progress } from "antd";
import { AppContext } from "../../../../context/app.context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../constants";
const { Option } = Select;

export default function StepLocation() {
  const { futureTask, setFutureTask, regions, user } = useContext(AppContext);
  const [cauzeEvent, setCauzeEvent] = useState([]);
  const history = useHistory();

  const onFinish = (dataForm) => {
    setFutureTask({ ...futureTask, stepLocation: dataForm });
    history.push("/step-pick-car");
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/task/get-accident-cause`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setCauzeEvent(response.data);
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
    setFutureTask({ ...futureTask, stepLocation: allValues });
  };

  return (
    <StepLocationWrapper>
      <Progress style={{ marginBottom: 32 }} percent={41.2} />
      <FancyHeader title="Pasul 5" subtitle="Despre locatie" />

      <Form
        onValuesChange={onValuesChange}
        size="large"
        initialValues={{ ...futureTask.stepLocation }}
        hideRequiredMark
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item label="Judet" name="judet" rules={[{ required: true, message: "Adauga un judet!" }]}>
          <Select
            placeholder="Alege un judet"
            allowClear
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {regions.map((region) => (
              <Option key={region.id} value={region.id}>
                {region.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Oras" name="Oras" rules={[{ required: true, message: "Adauga un oras!" }]}>
          <Input autoComplete="off" placeholder="Oras" />
        </Form.Item>

        <Form.Item label="Strada / Drum national" name="adress" rules={[{ required: true, message: "Adauga o strada / drum national!" }]}>
          <Input autoComplete="off" placeholder="Strada Fabricii" />
        </Form.Item>

        <Form.Item label="Numar" name="adress_number" rules={[{ required: true, message: "Adauga un numar!" }]}>
          <Input autoComplete="off" placeholder="38" />
        </Form.Item>

        <Form.Item label="Cauza eveniment" name="cause_event" rules={[{ required: true, message: "Alege o cauza!" }]}>
          <Select
            placeholder="Alege cauza eveniment"
            allowClear
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {cauzeEvent.map((cauza) => (
              <Option value={cauza.id} key={cauza.id}>
                {cauza.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Descriere eveniment" name="description" rules={[{ required: true, message: "Adauga o descriere!" }]}>
          <Input.TextArea autoComplete="off" autoSize placeholder="Descrie evenimentul..." />
        </Form.Item>

        <Form.Item>
          <Button block shape="round" type="primary" htmlType="submit">
            Urmatorul pas
          </Button>
        </Form.Item>
      </Form>
    </StepLocationWrapper>
  );
}
