import styled from "styled-components";

export const Map2DWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow: scroll;
  position: relative;
`;
export const CarMapWrapper = styled.div`
  height: 100%;

  .react-transform-component {
    height: 100%;
  }
  img {
    width: 100%;
    opacity: 0.9;
    max-height: calc(100vh - 64px);
  }

  svg {
    width: 100%;
    height: 100vh;
    fill: #1890ff;
    position: absolute;
  }
`;

export const PreviewPhotoWrapper = styled.div`
  height: calc(100vh - 64px);
  position: fixed;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  .react-html5-camera-photo {
    video {
      object-fit: contain;
      height: calc(100vh - 64px);
      background: black;
    }
  }

  img {
    width: 100%;
  }
`;

export const PreviewPhotoHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  backdrop-filter: blur(61px);
  background: #00000017;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;

  .camera-title {
    color: #fff;
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
  background: #00000017;
  padding: 32px;
`;
export const CommentTag = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  color: rgb(255, 255, 255);
  padding: 2px 32px;
  backdrop-filter: blur(40px);
  border-radius: 0px 33px 33px;
  box-shadow: 0px 0px 20px -7px #000;
`;

export const ButtonWrapper = styled.div`
  padding: 32px;
  position: absolute;
  bottom: 0;

  width: 100%;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: calc(100vh - 64px);
  overflow: scroll;
`;
