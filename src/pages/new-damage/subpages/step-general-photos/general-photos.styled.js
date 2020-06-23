import styled from 'styled-components';

export const StepGeneralPhotosWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 32px 15px;
	background: #F1F0F2;

	.submit_button {
		margin-top: 64px;
	}
	.ant-progress-bg{
		background: #10E4E4;
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
`;

export const ImagePreviewWrapper = styled.div`
	width: 300px;
	border-radius: 8px;
	margin-bottom: 32px;
	margin-left: 20px;

`;

export const ImagesWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;
export const LabelWrapper = styled.div`
	font-weight: bold;
`;

