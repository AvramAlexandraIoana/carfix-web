import styled from 'styled-components';

export const NotificatonWrapper = styled.div`
  background: #fff;
  padding: 16px;
  display: flex;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0px 30px 70px -37px #000;

  .anticon {
    padding: 16px;

    svg {
      fill: #1890ff;
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  h2 {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
  }

  h3 {
    margin: 0;
    font-size: 12px;
    opacity: 0.6;
  }
`;
