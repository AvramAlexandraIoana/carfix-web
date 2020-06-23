import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { useHistory, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import {
	CheckCircleOutlined
  } from '@ant-design/icons';
  
import {
	PickRoleWrapper,
	InspectorWrapper,
	ClientWrapper,
	TextBottomWrapper,
	ClientSelectedWrapper,
	LogoWrapper,
	RolesWrapper,
	IconWrapper,
	ButtonWrapper
} from './pick-role.styled';
import { Logo } from '../../components';
export default function PickRolePage() {
	const { loginRole, setLoginRole, user } = useContext(AppContext);
	const history = useHistory();
	const [selectedOption, setSelectedOption] = useState(null);

	if (user) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<PickRoleWrapper className="PickRoleWrapper">
			<LogoWrapper className="LogoWrapper">
				<Logo hideRole />
			</LogoWrapper>

			<RolesWrapper className="RolesWrapper">
				<ClientWrapper
					className={selectedOption === "client" ? "active" : ""}
					onClick={() => {
						if (selectedOption === "client") {
							setSelectedOption(null);
						} else {
							setSelectedOption('client');
						}
					}}>
					{selectedOption === "client" && (
						<IconWrapper>
							<CheckCircleOutlined/> 
						</IconWrapper>)}
					Sunt Client <span>Aenean sed nibh a magna posuere tempor. Nunc faucibus</span>
				</ClientWrapper>
				<InspectorWrapper
					className={selectedOption === "constatator" ? "active" : ""}
					onClick={() => {
						if (selectedOption === "constatator") {
							setSelectedOption(null);
						} else {
							setSelectedOption('constatator');
						}
					}}>
					{selectedOption === "constatator" && (
						<IconWrapper>
							<CheckCircleOutlined /> 
						</IconWrapper>)}
					Sunt Constatator <span>Aenean sed nibh a magna posuere tempor. Nunc faucibus</span>
				</InspectorWrapper>
				{
					selectedOption && (
						<ButtonWrapper
							type="primary"
							onClick={() => {
								console.log(selectedOption);
								setLoginRole(selectedOption);
								history.push('login');
							}}>
							Inainte
						</ButtonWrapper>
					)
				}
				


			</RolesWrapper>
		</PickRoleWrapper>
	);
}
