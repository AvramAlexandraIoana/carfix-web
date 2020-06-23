import styled from 'styled-components';

export const PickCarPageWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 32px 15px;
	background: #F1F0F2;
	.CarListItemWrapper{
		&.active{
				border: 2px solid #10E4E4 !important;
				border-radius: 20px !important;
			}
	}
	.submit_button {
		margin-top: 60px;
	}
	.ant-progress-bg{
		background: #10E4E4;
	}
	button{
		&.ant-btn-primary{
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
		}
	}
	.ant-form-item{
		background: #fff;
		padding: 20px 40px 30px;
		border-radius: 20px;
		margin-bottom: 15px;
		input{
			border-radius: 19px;
			border: 1px solid #707070;
			font-size: 12px;
			line-height: 20px;
			height: 37px !important;
		}
		.ant-select-selector{
		border-radius: 19px;
		border: 1px solid #707070;
		font-size: 12px;
		line-height: 20px;
		height: 39px !important;
		}
		&.submit_button{
			background: transparent;
			margin-top: 0;
			padding-bottom: 0;
			margin-bottom: 0;
		}
		label{
			color: #181726;
			font-size: 14px;
			line-height: 20px;
			font-weight: 500;
			height: auto;
			margin-bottom: 0px;
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
		}
	}


	&.paddingButtom {
		padding-bottom: 50px;
	}
`;
export const ButtonWrapper = styled.div`
	position: absolute;
	bottom: calc(64px + 16px);
	width: 100%;
	display: flex;
	left: 0;
	justify-content: center;
	padding: 0 15px;
	button {
		width: 250px;
	}
`;
export const ButtonWrapperIR = styled.div`
	position: absolute;
	bottom: calc(64px + 16px);
	width: 100%;
	display: flex;
	left: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	button {
		width: 250px;
		margin-bottom: 16px;
	}
`;
export const ButtonAddCarWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;
export const LoadingWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: calc(100vh - 64px);
	width: 100%;
	align-items: center;
	justify-content: center;
	display: flex;
`;

export const SpinWrapper = styled.div`
	height: calc(100vh - 64px);
	display: flex;
	justify-content: center;
	align-items: center;
`;
