import styled from 'styled-components';

export const ListItemWrapper = styled.div`
	border: 1px solid #F2F4F5;
	display: flex;
	justify-content: space-between;
	padding: 25px 10px;
	border-radius: 20px;
	margin-bottom: 16px;
	transition: 0.3s;
	background: #F9FBFC;
	font-size: 12px;
	line-height: 26px;
	color: #464646;
  &.Garajul-meu{
		padding: 10px;
	}
	&:hover {

		background: #181726;
		color: #fff;
		.TitleWrapper {
			color: #fff;
		}
		.IconWrapper {
			svg {
				fill: #fff;
			}
	 }
	}

	&.disabled {
		background: #F8F8F8;
		color: #919099;
		border: 1px solid ##F0F0F0;
		.TitleWrapper {
			color: #919099;
		}

		&:hover {
			transform: none;
		}
		.IconWrapper {
			svg {
				fill: #919099;
			}
			img{
				opacity: 0.5;
			}

		}
	}


`;

export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		fill: #241332;
		font-size: 23px
	}
`;

export const TitleWrapper = styled.div`
	color: #241332;
	margin-bottom: -4px;
	font-size: 16px;
	line-height: 20px
	&:hover {
		color: #fff;
	}
`;
export const SubtitleWrapper = styled.div`
	font-size: 12px;
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 16px;
	justify-content: center;
`;
