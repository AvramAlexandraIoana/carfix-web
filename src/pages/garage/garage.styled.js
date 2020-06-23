import styled from 'styled-components';

export const ButtonAddCarWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 64px;
	button{
		width: 100%;
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
`;
export const GaragePageWrapper = styled.div`
	height: calc(100vh - 64px);
	padding: 32px;
	overflow: scroll;
	background: #F1F0F2;
`;
export const SearchContent = styled.div`
  position: relative;
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
