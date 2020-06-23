import styled from 'styled-components';

export const GeneralActionsWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 64px 32px 32px 32px;

	img {
		width: 100%;
		border-radius: 11px;
		margin-bottom: 64px;
	}

	.InfoWrapper{
		order: 2;
	}
	.IconWrapper{
		order: 1;
		min-width: 71px;
		img{
			margin: 0;
			width: auto;
		}
	}
	.ListItemWrapper{
		justify-content: end;
	}
	.Dauna-noua{
			padding: 15px 10px;
		}
`;
export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	button {
		margin-bottom: 32px;
	}
`;
