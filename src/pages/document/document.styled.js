import styled from "styled-components";

export const DocumentPageWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow: scroll;
`;
export const PDFWrapper = styled.div`
  .columns {
    position: fixed;
    bottom: calc(64px + 32px);
    width: calc(100% - 32px - 32px);
    left: 32px;
  }

  .is-3 {
    width: unset !important;
    display: flex;
  }
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(64px + 32px);
  width: 100%;
  left: 0px;
  display: flex;
  justify-content: center;

  button {
    padding: 4px 32px;
  }
`;
export const SignatureWrapper = styled.div`
  .FancyHeader {
    margin-top: 96px;
  }

  .sigCanvas {
    display: block;
    margin: 0 auto;
    border: 1px solid #eee;
  }
`;

export const ButtonsWrapper = styled.div`
  padding: 32px;
  button {
    margin-bottom: 16px;
  }
`;
export const IbanInputWrapper = styled.div`
  padding: 32px;

  .error-message {
    font-size: 14px;
    color: #ff3737;
    margin-top: 8px;
  }
`;
