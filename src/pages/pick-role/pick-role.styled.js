import styled from 'styled-components';

import { Button as AntButton } from 'antd';

export const Button = styled(AntButton)`
width: 100%;
border-radius: 52px;
margin-top: 32px;
background: #10E4E4;
color: #181726;
font-size: 14px;
line-height: 26px;
border: 0;
padding: 13px 0;
display: inline-block;
height: auto;
font-weight: 500;
text-transform: uppercase;
`;
export const PickRoleWrapper = styled.div`
	padding: 32px;
`;
export const InspectorWrapper = styled.div`
	padding: 32px;
	height: 250px;
 	background: rgb(249,251,252);
 	margin-top: 32px;
	margin-bottom: 32px;
	border-radius: 35px;
	text-align: center;
	padding: 90px 30px;
	color: #464646;
	font-size: 18px;
	line-heigth: 26px;
	font-weight: bold;
	-webkit-box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);
-moz-box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);
box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);

	span {
		font-size: 16px;
		font-weight: normal;
		display:block
	}

	&.active {
		background: #181726;
		color: white;
	}
`;


export const ClientWrapper = styled.div`
	padding: 32px;
	height: 250px;
 	background: rgb(249,251,252);
 	margin-top: 32px;
	margin-bottom: 32px;
	color: #464646;
	text-align: center;
	padding: 90px 30px;
	font-size: 18px;
	line-heigth: 26px;
	font-weight: bold;
	border-radius: 35px;
	-webkit-box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);
	-moz-box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);
	box-shadow: 0px 10px 30px 0px rgba(24,23,38,0.4);
	margin-bottom: 32px;

	span {
		font-size: 16px;
		font-weight: normal;
		display:block
	}

	&.active {
		background: #181726;
		color: white;
		postion: relative;
	}
`;



export const LogoWrapper = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto 32px auto;

	img {
		width: 100%;
	}
`;

export const RolesWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;



export const ButtonWrapper = styled.button`
	width: 100%;
	border-radius: 52px;
	margin-top: 32px;
	background: #10E4E4;
	color: #181726;
	font-size: 14px;
	line-height: 26px;
	border: 0;
	padding: 13px 0;
	display: inline-block;
	height: auto;
	font-weight: 500;
	text-transform: uppercase;
`;


export const IconWrapper = styled.span`
	position: relative;
	top: -60px;
	left: 45%;
	display: unset !important;

	span {
		svg {
			background: #10E4E4;
			color: #000;
			font-size: 34px;
			border-radius: 100%;
			font-weight: 300;
			position: absolute;
			top: -10px;
			right: -10px;
		}
	}
`;
