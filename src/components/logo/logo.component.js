import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';

import { LogoWrapper } from './logo.styled';
export default function Logo({ hideRole }) {
	const { loginRole, setLoginRole } = useContext(AppContext);

	const toggleLoginRole = () => {
		if (loginRole === 'client') {
			setLoginRole('constatator');
		} else {
			setLoginRole('client');
		}
	};
	return (
		<LogoWrapper id="hidden" onClick={toggleLoginRole} className="LogoWrapper">
			<img src="https://www.designyourway.net/blog/wp-content/uploads/2018/12/blue-700x525.jpg" />

			{!hideRole && <span>Carfix {loginRole}</span>}
		</LogoWrapper>
	);
}
