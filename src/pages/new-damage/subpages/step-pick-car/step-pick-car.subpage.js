import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../../context/app.context";
import { useHistory } from "react-router-dom";
import { FancyHeader, CarListItem } from "../../../../components";
import loadingImage from "../../../../assets/gif/loading.gif";
import { Button, Spin, Progress } from "antd";
import {
  PickCarPageWrapper,
  ButtonWrapper,
  ButtonAddCarWrapper,
  LoadingWrapper,
  ButtonWrapperIR,
  SpinWrapper,
} from "./step-pick-car.styled";

export default function StepPickCar() {
  const { user, getClientCars, cars, futureTask, isLoading, setFutureTask } = useContext(AppContext);

  const selectCar = (car) => {
    setFutureTask({ ...futureTask, car: car });
  };
  const history = useHistory();
  // Local state

  useEffect(() => {
    getClientCars(futureTask.client.id || user.user.id);
  }, []);

  const renderLoading = () => {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  };

  const renderContent = () => {
    return cars && cars.map((car) => <CarListItem onClick={() => selectCar(car)} key={car.id} car={car} />);
  };

  const renderFNOL = () => (
    <PickCarPageWrapper className={`PickCarPageWrapper ${futureTask.car.id && "paddingButtom"}`}>
      <Progress style={{ marginBottom: 32 }} percent={49.6} />
      <FancyHeader title="Pasul 6" subtitle={`Alege o masina ${user.user.full_name}`} />
      <ButtonAddCarWrapper className="ButtonAddCarWrapper">
        <Button onClick={() => history.push("/add-car")} type="primary" shape="round">
          Adauga o masină
        </Button>
      </ButtonAddCarWrapper>

      {isLoading ? renderLoading() : renderContent()}

      {!isLoading && futureTask.car.id && (
        <ButtonWrapper className="ButtonWrapper fadeInUp animated faster">
          <Button onClick={() => history.push("/step-documents-injured")} type="primary" shape="round">
            Continuă
          </Button>
        </ButtonWrapper>
      )}
    </PickCarPageWrapper>
  );

  const renderIR = () => (
    <PickCarPageWrapper className={`PickCarPageWrapper ${futureTask.car.id && "paddingButtom"}`}>
      <Progress style={{ marginBottom: 32 }} percent={12} />
      <FancyHeader title="Pasul 2" subtitle={`Alege o masina pentru ${futureTask.client.full_name}`} />

      {isLoading ? renderLoading() : renderContent()}

      {!isLoading && futureTask.car.id && (
        <ButtonWrapperIR className="ButtonWrapper fadeInUp animated faster">
          <Button className="bounceInLeft animated" onClick={() => history.push("/step-map-2d")} shape="round">
            Masina are daune
          </Button>
          <Button className="bounceInRight animated" onClick={() => history.push("/step-general-photos")} type="primary" shape="round">
            Masina nu are daune
          </Button>
        </ButtonWrapperIR>
      )}
    </PickCarPageWrapper>
  );

  if (!futureTask.type) {
    return (
      <SpinWrapper>
        <Spin size="small" />
      </SpinWrapper>
    );
  }

  return futureTask.type === "FNOL" ? renderFNOL() : renderIR();
}
