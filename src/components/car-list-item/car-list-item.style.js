import styled from 'styled-components';

export const CarListItemWrapper = styled.div`
	border: 1px solid #eee;
	background: #fff;
	font-size: 14px;
	line-height: 17px;
	color: #241332;
	font-weight: 500;
	padding: 8px;
	border-radius: 20px;
	margin-bottom: 16px;
	transition: 0.3s;
`;
export const ContainerWrapper = styled.div`
	.active {
		box-shadow: 0px 0px 20px -10px #7c7c7c;
		border-left: 4px solid #1890ff;
	}
`;
export const BrandInfo = styled.div`
	border-bottom: 1px solid #eee;
	padding: 8px;

	.CarMake {
		font-weight: 700;
	}
	.CarModel {
		margin-left: 16px;
	}
`;
export const CarInfo = styled.div`
	padding: 8px;
	justify-content: space-between;
	display: flex;
	margin-top: 8px;
`;

export const CarMake = styled.div`
	font-weight: 700;
	padding-left: 8px;
	padding-top: 7px;
`;

export const Information = styled.div`
	padding-left: 8px;
	padding-top: 7px;
	img {
		position: relative;
		left: 10px;
	}
`;

export const CarNumberWrapper = styled.div`
	background: #fff;
	border-radius: 2px;
	border: 1px solid #111;
	color: #111;
	padding: 0px 4px 0px 0px;
	display: flex;
	&::before {
		content: 'RO';
		background: #10E4E4;
		display: flex;
		font-size: 7px;
		width: 12px;
		color: #fff;
		justify-content: center;
		align-items: flex-end;
		margin-right: 4px;
	}
`;
