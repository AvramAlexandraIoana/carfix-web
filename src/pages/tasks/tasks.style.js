
import styled from "styled-components";
import { Button } from "antd";

export const TabButton = styled(Button)`
  min-width: 150px;
  margin: 0 8px;
  border-radius: 33px;
`;

export const TabsWrapper = styled.div`
  overflow: scroll;
  display: flex;
  padding: 16px 0px;
  background: #fff;
  border: 1px solid #d3cfcf;
  margin-bottom: 50px;
  border-radius: 0px 0px 0px 50px;
  height: 100px;
}
`;
export const TasksPageWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow: scroll;
  .buttons-top{
    padding-right: 15px;
    button{
      position: relative;
      top: 20px;
      min-width: auto;
      padding: 10px 20px;
      line-height: 20px;
      height: 40px;
      font-size: 12px;
      font-weight: 600;
      color: #767676;
      background: transparent;
      border-radius: 20px;
      border: 0;
      box-shadow: none;
        &:hover{
          color: #181726;
          background: #10E4E4;
          }
    }
    .ant-btn-primary{
      min-width: auto;
      padding: 10px 20px;
      line-height: 20px;
      height: 40px;
      font-size: 12px;
      font-weight: 600;
      color: #181726;
      background: #10E4E4;
      border-radius: 20px;
      border: 0;
    }
  }
  .ant-tabs-nav-scroll {
    display: flex;
    justify-content: center;
  }

  .FancyHeader {
    margin-top: 64px;
    margin-bottom: 32px;
  }
`;
export const TasksPageContent = styled.div`
  padding: 32px 16px;
  .TaskWrapper {
    .InfoWrapper{
      .InfoTop{
        .MakeWrapper{
          font-weight: 500;
          color: #241332;
        }
        &:last-child{
          display: inline-block;
        }
        img{
          display: inline-block;
          left: auto;
          margin-left: 10px;
          top: -1px;
          position: relative;
        }
      }
    }
  }
  .In-lucru{
    .InfoWrapper{
      .InfoTop{
        .MakeWrapper{
          font-weight: 500;
          color: #fff;
            }
        img{
          filter: brightness(0) invert(1);
          }
        }
      }
  }
  .ant-badge {
    width: 100%;
  }
`;
export const SearchContent = styled.div`
  position: relative;
  padding: 1px 14px 1px 16px;
  input{
    font-size: 16px;
    line-height: 22px;
    color:#181726;
    border:0;
    border-bottom: 1px solid #767676;
    &:focus{
      border:0;
      border-bottom: 2px solid #10E4E4;
      outline: none;
      box-shadow: none;
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


export const TitleWrapper = styled.div`
  position: relative;
  color: black;
  display: inline;
  left: 30px;
  font-weight: bold;
  font-size: 18px;
  top: -5px;
`;


export const IconWrapper = styled.div`
  position: relative;
  left: 10px;
  top: -2px;
  color: black;
`;

