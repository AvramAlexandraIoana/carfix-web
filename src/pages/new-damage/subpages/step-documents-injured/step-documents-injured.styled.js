import styled from 'styled-components';

import { Button as AntButton } from 'antd';
export const InjuredDocumentsWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 32px 15px;
	background: #F1F0F2;
	.ImagePreviewWrapper{
		width: 100%
	}
	.ImageThumbnailWrapper{
	 background: #f8f8f8;
	 border: 2px dashed #707070;
	 border-radius: 20px;
	 .anticon {
	 font-size: 28px;
	 }
	 .ImageTitle{
		 background: transparent;
		 bottom: 15%;
		 color: #767676;
		-webkit-backdrop-filter: none;
   		 backdrop-filter: none;
	 }
	}
	.submit_button {
		margin-top: 64px;
	}
	.ant-progress-bg{
		background: #10E4E4;
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
		margin-top: 10px;
	}
`;

export const ImagePreviewWrapper = styled.div`
	width: 150px;
	border-radius: 8px;
	margin-bottom: 32px;
`;

export const ImagesWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const Button = styled(AntButton)`
	border-radius: 33px;
	width: 100%;
	margin-top: 20vh;
`;
