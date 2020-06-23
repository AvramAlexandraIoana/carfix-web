import React, { useEffect, useContext, useState } from 'react';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import daunanouaiconpng from '../../assets/gif/daunanoua-icon.png';
import {
	ArrowLeftOutlined
} from '@ant-design/icons'
import { FancyHeader, CarListItem } from '../../components';
import { AppContext } from '../../context/app.context';

import { ButtonAddCarWrapper, GaragePageWrapper, SearchContent, CarContent, IconWrapper, TitleWrapper, NumberWrapper, CarsNumber } from './garage.styled';
export default function GaragePage() {
	const history = useHistory();
	const { user, getClientCars, cars } = useContext(AppContext);
	const [carsLocal, setCarsLocal] = useState([])
	const [ notFound, setNotFound] = useState(1);
	const [userSearchInput, setUserSearchInput] = useState("");
	const [carsNumber, setCarsNumber] = useState(0);

	useEffect(() => {
		getClientCars(user.user.id);
	}, []);


	useEffect(() => {
	  console.log(cars);
	  if(cars){
		setCarsNumber(cars.length);
		setCarsLocal(cars);
	  }
	}, [cars]);

	useEffect(() => {
		if(userSearchInput){
		  renderTasks();
		} else {
			console.log("GOL");
			setCarsLocal(cars);
		}
	  }, [userSearchInput]);

	  const renderTasks = () => {
		const futureCarsLocal = cars.filter(
			(car) =>
				car.vin.toLowerCase().includes(userSearchInput.toLowerCase()) ||
				car.model.toLowerCase().includes(userSearchInput.toLowerCase()) ||
				car.make.toLowerCase().includes(userSearchInput.toLowerCase()) ||
				car.registration_number.toLowerCase().includes(userSearchInput.toLowerCase())
		  );
		console.log(futureCarsLocal);
		setCarsLocal(futureCarsLocal);
		if (!futureCarsLocal.length && userSearchInput) {
			setNotFound(0);
		} else {
			setNotFound(1);
		}
	  };

	return (
		<GaragePageWrapper className="GaragePageWrapper">

			<ButtonAddCarWrapper className="ButtonAddCarWrapper">
				<IconWrapper>
					<ArrowLeftOutlined onClick={() => history.goBack()}/> 
				</IconWrapper>
				<TitleWrapper>
					Garajul tau
				</TitleWrapper>
				<img onClick={() => history.push('/add-car')} src={daunanouaiconpng}/>
				<NumberWrapper>
					Ai <CarsNumber> {carsNumber}  </CarsNumber>masini adaugate
				</NumberWrapper>
			</ButtonAddCarWrapper>
			<SearchContent>
				<Input.Search placeholder="Caută..." value={userSearchInput} onChange={(e) =>
						setUserSearchInput(e.currentTarget.value)
					} enterButton />
      		</SearchContent>
			<br/>
			<CarContent>
				{carsLocal && carsLocal.map(car => <CarListItem  onClick={() => {
						history.push({ pathname: "/view-car", search: `?id=${car.id}` });
						}} key={car.id} car={car} />)}
				<div>
					{(notFound === 0) && (
						<div>Nu s-a găsit nimic</div>
					)}
				</div>
			</CarContent>
			
		</GaragePageWrapper>
	);
}
