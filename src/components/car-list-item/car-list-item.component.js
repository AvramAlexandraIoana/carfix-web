import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/app.context';

import {
	ContainerWrapper,
	CarListItemWrapper,
	BrandInfo,
	CarInfo,
	CarNumberWrapper,
} from './car-list-item.style';

import { useLocation } from 'react-router-dom';
export default function CarListItem({ car, onClick }) {
	const { futureTask } = useContext(AppContext);
	const location = useLocation();

	console.log(location);
	return (
		<ContainerWrapper>
			<CarListItemWrapper
				onClick={onClick}
				className={`CarListItemWrapper ${
					futureTask.car.id === car.id && location.pathname === '/step-pick-car'
						? 'active'
						: 'inactive'
				}`}>
				<BrandInfo>
					<span className="CarMake">{car.make}</span>
					<span className="CarModel">{car.model}</span>
				</BrandInfo>
				<CarInfo>
					<CarNumberWrapper className="CarNumberWrapper">
						{car.registration_number}
					</CarNumberWrapper>
					<span className="CarVin">{car.vin}</span>
				</CarInfo>
			</CarListItemWrapper>
		</ContainerWrapper>
	);
}

CarListItem.propTypes = {
	car: PropTypes.object.isRequired,
	onClick: PropTypes.func,
};
