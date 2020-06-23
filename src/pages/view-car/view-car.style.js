import styled from "styled-components";


export const CarPageWrapper = styled.div`
	height: calc(100vh - 64px);
	overflow: scroll;
	padding: 32px 16px;
`;

export const ButtonEditCarWrapper = styled.div`
	width: 100%;
	display: flex;
  justify-content: center;
  margin-top: 20px;
	margin-bottom: 64px;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 64px;
  display: flex;
  justify-content: center;
`;
export const SectionWrapper = styled.div`
  margin-bottom: 32px;

  .ant-select {
    width: 100%;
  }

  h3 {
    font-weight: 400;
    color: #989898;
  }
`;
