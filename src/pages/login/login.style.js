import styled from 'styled-components';
import { Button as AntButton } from 'antd';

export const Button = styled(AntButton)`
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
`;

export const LoginPageWrapper = styled.div`
  padding: 92px 32px 32px 32px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .FancyHeader {
    margin-bottom: 64px;
  }


  #form-login {
    #basic_username{
      font-size: 16px;
      line-height: 20px;
      color:#181726;
      border:0;
      border-bottom: 1px solid #767676
      }
      #basic_username:focus{
        border:0;
        border-bottom: 2px solid #10E4E4;
        outline: none;
        box-shadow: none;
        }
  }

  #form-login {
    #basic_password{
      font-size: 16px;
      line-height: 20px;
      color:#181726;
      border:0;
      border-bottom: 1px solid #767676
      }
      #basic_password:focus{
        border:0;
        border-bottom: 2px solid #10E4E4;
        outline: none;
        box-shadow: none;
        }
  }
`;

export const LogoWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

export const ForgotPassWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button{
    margin: 0 auto;
  }
  span{
    color: #181726;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 500;
        line-height: 26px;
  }
`;
export const CreateAccountWrapper = styled.div`
  margin-top: auto;

  button {
    width: 100%;
  }

`;
