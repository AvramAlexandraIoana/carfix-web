import React, { useEffect, useContext, useState } from 'react';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';

 
import { FancyHeader, CarListItem } from '../../components';
import { AppContext } from '../../context/app.context';

import { ButtonAddCarWrapper, GaragePageWrapper, SearchContent } from './garage.styled';
export default function GaragePage() {
	const history = useHistory();
	const { user, getClientCars, cars } = useContext(AppContext);
	const [carsLocal, setCarsLocal] = useState([])
	const [ notFound, setNotFound] = useState(1);
	const [userSearchInput, setUserSearchInput] = useState("");

	useEffect(() => {
		getClientCars(user.user.id);
	}, []);


	useEffect(() => {
	  console.log(cars);
	  if(cars){
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
			<FancyHeader title={`Garajul tau`} subtitle={`Acesta este garajul tau`} />

			<ButtonAddCarWrapper className="ButtonAddCarWrapper">
				<Button onClick={() => history.push('/add-car')} type="primary" shape="round">
					Adauga o masină
				</Button>
			</ButtonAddCarWrapper>
			<SearchContent>
				<Input.Search placeholder="Caută..." value={userSearchInput} onChange={(e) =>
						setUserSearchInput(e.currentTarget.value)
					} enterButton />
      		</SearchContent>
			<br/>
			{carsLocal && carsLocal.map(car => <CarListItem  onClick={() => {
    				 history.push({ pathname: "/view-car", search: `?id=${car.id}` });
      				}} key={car.id} car={car} />)}
			<div>
				{(notFound === 0) && (
					<div>Nu s-a găsit nimic</div>
				)}
			</div>
		</GaragePageWrapper>
	);
}
