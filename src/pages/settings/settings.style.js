import styled from 'styled-components';

export const SettingsPageWrapper = styled.div`
	padding: 64px 25px 32px 25px;
	height: calc(100vh - 64px);
	overflow: scroll;
	background: #f1f0f2;
	h2 {
		font-weight: 400;
		font-size: 14px;
		color: #111;
		opacity: 0.6;
		margin-bottom: 16px;
	}
	.ListItemWrapper{
		background: #fff;
		border-color: #fff;
	}
`;
export const SectionWrapper = styled.div`
	margin-bottom: 32px;

	&.Section1Setting{
		display: grid;
		grid-template-columns: auto auto auto;
		padding: 20px 10px;
		background: #fff;
		border-radius: 30px;


		.ListItemWrapper{
		display: flex;
		flex-direction: column;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
    background: #fff;
    border: 0;
    border-radius: 0;
		position: relative;
		.InfoWrapper{
			margin: 10px 0 0px;
			order: 2;
			.TitleWrapper{
				font-size: 13px;
				line-height: 1;
				margin: 0;
				color: #181726;
			}
		}
		.IconWrapper{
			height: 30px;
    	width: auto;
			order: 1;
		}
		}
	}
`;
export const ProfileInfoWrapper = styled.div`
	justify-content: center;
	display: flex;
	background: white;
	flex-direction: column;
	align-items: center;
	margin-bottom: 32px;
	div {
		margin-top: 16px;
	}
	.LastNameUserClass{
		font-weight: bold;
		font-size: 18px;
		color: #181726;
		line-height: 30px;
	}
	.RoleUserClass{
		text-transform: uppercase;
		color: #767676;
		font-size: 12px;
	}
	.LogoutClass{
		font-size: 12px;
		text-transform: uppercase;
		line-height: 30px;
		color: #181726;
	}
	.ant-avatar{
		width: 97px !important;
		height: 97px !important;
		line-height: 97px !important;
		border: 1px solid #10E4E4;
	}
`;

export const IconNotificationNumberWrapper = styled.div`
		background: #10E4E4;
		position: relative;
		top: -36px;
		border-radius: 20px;
		left: 12px;
		text-align: center;
		font-size: 13px;
		line-height: 21px;
		width: 21px;
		height: 21px;
`;

export const IconProfileWrapper = styled.div`
		background: #10E4E4;
		position: relative;
		top: -46px;
		border-radius: 20px;
		right: -24px;
		text-align: center;
		font-size: 16px;
		line-height: 32px;
		width: 32px;
		height: 32px;
`;

export const ImageUpload = styled.div`
	input {
		display: none;
	}

	label {
		position: relative;
		top: -65px;
	}

	img
	{
		width: 80px;
		cursor: pointer;
	}

`;
export const LogOutWrapper = styled.div`
	position: relative;
	left: 40%;
`;
