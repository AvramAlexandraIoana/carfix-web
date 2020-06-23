import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/app.context";
import { Descriptions, Form, Input, Select, Row, Col, Button, message, Spin } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FancyHeader } from "../../components";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";

import { SectionWrapper, ImageWrapper, CarPageWrapper, ButtonEditCarWrapper } from "./view-car.style";
const { Option } = Select;

export default function ViewCarPage() {

	const history = useHistory();
  let locationUrl = useLocation();
  const { user, getClientCars, cars } = useContext(AppContext);
  const [ car, setCar ] = useState(null);

	useEffect(() => {
		getClientCars(user.user.id);
  }, []);
  
	useEffect(() => {
	  if(cars) {
      console.log(cars);
      const viewCar =  cars.filter(
        (car) => car.id === locationUrl.search.substring(4));
      console.log(viewCar);
      setCar(viewCar[0]);
    }
  }, [cars]);

  console.log(car);
  if (!car) {
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
  const {
    id,
    location,
    make,
    model,
    registration_number,
    type,
    vin,
    fuel_type,
    engine_type,
    model_year
  } = car;
  
  return (
    <CarPageWrapper>
      <FancyHeader title={`Car #${id}`} subtitle={`Detalii despre masina #${id}`} />

      <Descriptions bordered>
        <Descriptions.Item label="Car id">{id}</Descriptions.Item>
        <Descriptions.Item label="Car location">{location}</Descriptions.Item>
        <Descriptions.Item label="Car make">{make}</Descriptions.Item>
        <Descriptions.Item label="Car model">{model}</Descriptions.Item>
        <Descriptions.Item label="Car register number">{registration_number}</Descriptions.Item>
        <Descriptions.Item label="Car type">{type}</Descriptions.Item>
        <Descriptions.Item label="Car vin">{vin}</Descriptions.Item>
        <Descriptions.Item label="Car fuel type">{fuel_type}</Descriptions.Item>
        <Descriptions.Item label="Car model year">{model_year}</Descriptions.Item>

      </Descriptions>
      <ButtonEditCarWrapper className="ButtonEditCarWrapper">
				<Button onClick={() => {
    				 history.push({ pathname: "/edit-car", search: `?id=${id}` });
      				}} type="primary" shape="round">
					Editează date masină
				</Button>
			</ButtonEditCarWrapper>
    </CarPageWrapper>
  );

}
