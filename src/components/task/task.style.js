import styled from 'styled-components';

export const TaskWrapper = styled.div`
  border: 1px solid #F9FBFC;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  border-radius: 20px;
  background: #F9FBFC;
  color: #241332;
  font-size: 12px;
  line-height: 14px;
  &.In-lucru{
    background: #FC7900;
    color: #fff;
  }
  .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;

    svg {
      fill: #1890ff;
    }
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

export const MakeAndModelWrapper = styled.div`
  display: flex;
`;
export const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .anticon {
    padding: 0px; 
    position: relative;
    left: -75%;
    svg {
      fill: #515050;
    }
  }
`;

export const Information = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  width: 30%;
  .anticon {
    padding: 0px; 
    position: relative;
    left: -10%;
    svg {
      fill: #515050;
    }
  }
`;

export const InfoBottom = styled.div`
  display: flex;
`;
export const CarNumberWrapper = styled.div`
background: #10E4E4;
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
export const DateWrapper = styled.div`
`;
export const IDWrapper = styled.div``;

export const MakeWrapper = styled.div`
  font-weight: 500;
`;

export const StateWrapper = styled.div`
  background: #181726;
  color: #fff;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
`;
export const StateWrapperRejected = styled.div`
  background: #ff6a6a;
  color: #fff;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
`;
export const StateWrapperNew = styled.div`
  background: #fff;
  color: #181726;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
`;
export const StateWrapperApproved = styled.div`
  background: #10E4E4;
  color: #181726;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
`;
