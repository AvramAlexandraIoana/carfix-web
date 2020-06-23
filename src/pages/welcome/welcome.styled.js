import styled from "styled-components";

export const WelcomePageWrapper = styled.div``;

export const StepWrapper = styled.div``;

export const ImageWrapper = styled.div`
  height: 60vh;
  border-radius: 0 0px 0px 80px;
  h1 {
    font-size: 60px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    padding-top: 96px;
  }
`;
export const InfoWrapper = styled.div`
  height: 40vh;
  padding: 0px 32px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .Logo-mini {
    color: #10e4e4;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .primary {
    background: #10e4e4;
    border: none;
  }

  .Skip {
    position: fixed;
    bottom: 32px;
    color: black;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;
