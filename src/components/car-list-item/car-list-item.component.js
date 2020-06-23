import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/app.context';
import righticonpng from "../../assets/gif/right-arrow-icon.png";

import {
	ContainerWrapper,
	CarListItemWrapper,
	BrandInfo,
	CarInfo,
	CarNumberWrapper,
	CarMake,
	Information

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
				<CarInfo>
					<CarNumberWrapper className="CarNumberWrapper">
						{car.registration_number}
					</CarNumberWrapper>
				</CarInfo>
				<CarMake>{car.make}</CarMake>
				<Information>{car.model}</Information>
				<Information>{car.vin}</Information>
				<Information>
         			 IR | #  {car.id}
        		</Information>
				<Information>
					Vezi detalii
					<img src={righticonpng} />
				</Information>
			</CarListItemWrapper>
		</ContainerWrapper>
	);
}

CarListItem.propTypes = {
	car: PropTypes.object.isRequired,
	onClick: PropTypes.func,
};
