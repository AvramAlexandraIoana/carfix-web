import styled from 'styled-components';

import { Button as AntButton } from 'antd';

export const Button = styled(AntButton)`
	border-radius: 33px;
	width: 100%;
	margin-top: 64px;
`;

export const ProfilePageWrapper = styled.div`
	background: #F1F0F2;
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 64px 14px 32px 14px;

	form{
		background: #fff;
		border-radius: 20px;
		padding: 30px 44px 5px;
		.ant-form-item-label{
			padding-bottom: 0;
		}
		input{
			border: 0 !important;
			border-bottom: 1px solid rgba(153, 143, 162, 0.14) !important;
		}
		span{
			border: 0 !important;
			padding-left: 0;
			padding-right: 0;
		}
		label span{
			color: #181726;
			font-weight: 500;
			font-size: 14px;
			height: auto;
			margin-bottom: 10px;
			line-height: 20px;
		}
		label{
			color: #181726;
			font-weight: 500;
			font-size: 14px;
			height: auto;
			margin-bottom: 10px;
			line-height: 20px;
			&::before{
				display: none !important;
			}
	}

	}

	button{
		background: #10E4E4;
		color: #181726;
		font-weight: 500;
		font-size: 14px;
		line-height: 26px;
		height: 52px;
		border-radiu: 52px;
		width: 100%;
		text-align:center;
		text-transform: uppercase;
		border: 0;
		margin-top: 5px;
	}
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 32px;

`;
