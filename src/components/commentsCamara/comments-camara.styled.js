import styled from "styled-components";

export const CamaraWrapper = styled.div`
  height: calc(100vh - 64px);
  position: fixed;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;

  img {
    width: 100%;
  }

  .react-html5-camera-photo {
    video {
      object-fit: contain;
      height: calc(100vh - 64px);
      background: black;
    }
  }
`;

export const ConfirmationPreviewWrapper = styled.div`
  background: #101010;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  flex-direction: column;
`;

export const ConfirmationActionWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  backdrop-filter: blur(61px);
  background: #00000080;
  padding: 32px;
`;

export const CamaraHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  backdrop-filter: blur(61px);
  background: #00000080;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;

  .camera-title {
    color: #fff;
  }
`;

export const SelectorWrapper = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 64px;
  }
  background: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
  justify-self: self-start;
  margin-top: auto;
  padding: 32px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const OptionWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  background: #f2f2f2;
`;
export const CommentTag = styled.div`
  position: absolute;
  background: #00000080;
  color: rgb(255, 255, 255);
  padding: 2px 32px;
  backdrop-filter: blur(40px);
  border-radius: 0px 33px 33px;
  box-shadow: 0px 0px 20px -7px #000;
`;

export const TutorialWrapper = styled.div`
  position: absolute;
  z-index: 99;
  width: 80%;
  padding: 32px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 40%;
    margin-bottom: 32px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    max-height: calc(100vh - 64px);
    overflow: hidden;
  }
`;
