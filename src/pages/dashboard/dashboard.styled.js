import styled from 'styled-components';

export const DashboardPageWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 64px 32px 32px 32px;

	img {
		width: 100%;
		max-width: 135px;
	}

`;

export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	button {
		margin-bottom: 32px;
	}
`;


export const IconNumberWrapper = styled.div`
		background: #10E4E4;
		font-weight: bold;
		font-size: 18px;
		border-radius: 100%;
		padding: 0;
		-webkit-box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		-moz-box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		width: 83px;
		height: 83px;
		line-height: 83px;
		text-align: center;
		vertical-align: middle;
		display: inline-block;
`;

export const IconNotificationNumberWrapper = styled.div`
		background: #10E4E4;
		position: relative;
		top: -36px;
		border-radius: 20px;
		left: 12px;
		text-align: center;
		font-size: 12px;
		line-height: 20px;
		width: 20px;
		height: 20px;
		-webkit-box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		-moz-box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		box-shadow: 0px 0px 10px 10px rgba(16,228,228,0.16);
		font-weight: bold;

`;
export const TitleWrapper = styled.div`
	font-weight: bold;
	color: black;
	display: inline-flex;

`;
export const TitleNameWrapper = styled.div`
	font-size: 25px;
	font-weight: bold;

`;

export const ImgWrapper = styled.img`
	height: 25px;
	width: auto !important;
`;

export const ContainerWrapper = styled.div`
	position: relative;
	left: 100%;

`;
