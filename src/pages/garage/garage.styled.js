import styled from 'styled-components';

export const ButtonAddCarWrapper = styled.div`
	width: 100%;
	background: white;
	display: flex;
	justify-content: center;
	border-radius: 0px 0px 0px 50px;
	height: 80px;
	button{
		width: 150px;
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
		&:hover{
		  color: #10E4E4;
		  background: #181726;
		}
	}

	img {
		width: 50px;
		height: 50px;
		position: relative;
		left: 40%;
		top: 10px;
	}
	
`;

export const GaragePageWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	background: #F1F0F2;
`;

export const IconWrapper = styled.div`
	position: relative;
	top: 10px;
	color: black;
	left: -20px;
`;

export const CarsNumber = styled.span`
	font-weight: bold;
	color: black;
`;

export const TitleWrapper = styled.div`
	font-weight: bold;
	font-size: 18px;
	position: relative;
	top: 8px;
	color: black;
	left: -6px;
`;

export const NumberWrapper = styled.div`
	position: relative;
	top: 35px;
	left: -40%;
`;


export const SearchContent = styled.div`
  position: relative;
  padding: 32px;
	input{
		font-size: 16px;
		line-height: 22px;
		color: #181726;
		border: 0;
		border-bottom: 1px solid #767676;

		background: transparent;
		&:focus{
			border-bottom: 2px solid #10E4E4;
			outline: none;
		}
	}
	button{
		color: #181726;
    background: #10E4E4;
    border-radius: 0px;
    border: 0;
    box-shadow: none;
	}
`;

export const InputContent = styled.input`
  position: relative;
  width: 80%;
  border: 1px solid gray;
`;


export const CarContent = styled.div`
  padding: 32px;
  position: relative;
  top: -50px;
`;
