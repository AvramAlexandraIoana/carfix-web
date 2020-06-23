import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/app.context";
import { Form, Input, Select, Row, Col, Button, message, Spin } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { FancyHeader } from "../../components";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";

import { EditCarPageWrapper, SectionWrapper, ImageWrapper } from "./edit-car.style";
const { Option } = Select;

export default function EditCarPage() {
    const { user, makes, getMakes, getClientCars,  cars, setIsLoading, updateCar, isLoading, fuelTypes, bodyTypes } = useContext(AppContext);

    const history = useHistory();
    let locationUrl = useLocation();
    // Local state
    const [models, setModels] = useState(null);
  
    const [carImage, setCarImage] = useState(null);
    const [vin, setVin] = useState(undefined);
    const [number, setNumber] = useState(undefined);
    const [year, setYear] = useState(undefined);
    const [fuel, setFuel] = useState(undefined);
    const [bodyType, setBodyType] = useState(undefined);
    const [selectedMake, setSelectedMake] = useState(undefined);
    const [selectedModel, setSelectedModel] = useState(undefined);
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
            setVin(viewCar[0].vin);
            setNumber(viewCar[0].registration_number);
            setSelectedMake(viewCar[0].make_id);
            setModels(makes[viewCar[0].make_id].models);
            setSelectedModel(viewCar[0].model);
            setFuel(viewCar[0].fuel_type);
            setBodyType(viewCar[0].type);
            setYear(viewCar[0].model_year);
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
  
  
    const renderLoading = () => {
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
    };
  
    const handleFormSubmit = () => {
      const selectedModels =  models.filter(
        (model) => model.name === selectedModel);
      
      const selectedBodyTypes = bodyTypes.filter(
        (type) => type.name.name === bodyType);

      const selectedFuelTypes = fuelTypes.filter(
        (fuelType) => fuelType.name === fuel);

      const formData = {
        id: locationUrl.search.substring(4),
        body_id: selectedBodyTypes[0] ? selectedBodyTypes[0].id : bodyType ,
        fuel_type: selectedFuelTypes[0] ? selectedFuelTypes[0].id : fuel ,
        make_id: selectedMake,
        model_id: selectedModels[0] ? selectedModels[0].make_id : selectedModel,
        model_year: year,
        registration_number: number,
        vin: vin
      };
      updateCar(formData);
      history.goBack();
    };
  
    const handleVinDecoder = () => {
      // https://api.carfix.sergiumihai.dev.ascensys.ro/v1/gt-motive/vin-decoder
  
      setIsLoading(true);
      const bodyFormData = new FormData();
      bodyFormData.set("vin", vin);
  
      axios({
        method: "post",
        url: `${API_URL}/gt-motive/vin-decoder`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.jwt}`,
        },
      })
        .then(function (response) {
          //handle success
          if (response.data.error) {
            message.error(response.data.message);
          }
  
          const result = response.data.message.carDetails;
          setModels(makes[result.makeId].models);
          setSelectedMake(result.makeId.toString());
          setCarImage(result.modelImage);
          setSelectedModel(result.modelId.toString());
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
    return (
      <EditCarPageWrapper>
        <FancyHeader title={`Editează  masina`} subtitle={`Salut ${user.user.full_name}, editează  masina`} />
  
        {isLoading && renderLoading()}
  
        {carImage && (
          <ImageWrapper>
            <img src={"data:image/jpeg;base64," + carImage} />
          </ImageWrapper>
        )}
        <SectionWrapper>
          <h3>Vin decoder</h3>
          <Row>
            <Col>
              <Input placeholder="UU1B522046149XXXX" value={vin} onChange={(e) => setVin(e.currentTarget.value)} />
            </Col>
            <Col>
              <Button disabled={!vin ? true : false} onClick={handleVinDecoder}>
                Vin decoder
              </Button>
            </Col>
          </Row>
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>Marca</h3>
          <Select
            placeholder="Alege o marcă"
            showSearch
            value={selectedMake}
            defaultValue={{ name: "Select Dept", key: 0 }}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(e) => {
              console.log(e);
  
              setSelectedMake(e);
              setSelectedModel(null);
              setModels(makes[e].models);
            }}
          >
            {makes &&
              Object.values(makes).map((make) => (
                <Option value={make.id} key={make.id}>
                  {make.name}
                </Option>
              ))}
          </Select>
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>Model</h3>
          <Select
            value={selectedModel}
            placeholder="Alege un model"
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(e) => {
              setSelectedModel(e);
            }}
          >
            {models
              ? models.map((el) => (
                  <Option  value={el.id} key={el.name}>
                    {el.name}
                  </Option>
                ))
              : ""}
          </Select>
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>Caroserie</h3>
          <Select
            value={bodyType}
            placeholder="Alege o caroserie"
            onChange={(e) => {
              setBodyType(e);
            }}
          >
            {bodyTypes && bodyTypes.map((type) => (
              <Option value={type.id} key={type.id}>
                {type.name.name}
              </Option>
            ))}
          </Select>
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>Tip fuel</h3>
          <Select
            value={fuel}
            placeholder="Alege fuel type"
            onChange={(e) => {
              setFuel(e);
            }}
          >
            {fuelTypes && fuelTypes.map((type) => (
              <Option value={type.id} key={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>An</h3>
          <Input placeholder="2017" value={year} onChange={(e) => setYear(e.currentTarget.value)} style={{ width: "100%" }} />
        </SectionWrapper>
  
        <SectionWrapper>
          <h3>Numar masina</h3>
          <Input value={number} onChange={(e) => setNumber(e.currentTarget.value)} placeholder="B 01 ABC" style={{ width: "100%" }} />
        </SectionWrapper>
  
        <SectionWrapper>
          <Button
            onClick={handleFormSubmit}
            //disabled={!vin || !year || !bodyType || !number || !fuel || !selectedMake || !selectedModel}
            type="primary"
            block
            shape="round"
            htmlType="submit"
          >
            {!vin || !year || !bodyType || !number || !fuel || !selectedMake || !selectedModel ?
             "Completează tot" : "Actualizează date mașină"}
          </Button>
        </SectionWrapper>
      </EditCarPageWrapper>
    );
 
}
