import styled from 'styled-components';

export const TaskPageWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 32px 16px;
`;

export const ImageWrapper = styled.div`
	position: relative;
	img {
		border-radius: 4px;
		width: 100%;
	}

	.CommentLabel {
		position: absolute;
		background: #fff;
	}
`;

export const BadPhotoOverlayWrapper = styled.div`
	position: absolute;
	background: #00000030;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	z-index: 995;

	h2 {
		margin-bottom: 16px;
		color: #fff;
		font-size: 19px;
	}
`;
export const ApprovedPhotoOverlayWrapper = styled.div`
	position: absolute;
	background: #00000030;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	z-index: 995;

	h2 {
		margin-bottom: 16px;
		color: #fff;
		font-size: 19px;
	}
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

export const LabelWrapper = styled.span`
	position: absolute;
	top: 0;
	z-index: 999;
	background: rgba(255, 255, 255, 0.3);
	color: rgb(255, 255, 255);
	padding: 2px 32px;
	backdrop-filter: blur(40px);
	border-radius: 0px 33px 33px;
	box-shadow: 0px 0px 20px -7px #000;
`;
