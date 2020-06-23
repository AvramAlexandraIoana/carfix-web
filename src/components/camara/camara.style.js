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
  background: #00000017;
  padding: 32px;
`;

export const CamaraHeader = styled.div`
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

export const CammeraWrapperOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .overlay {
    width: 100%;
    position: absolute;
    z-index: 99;
    opacity: 0.3;
  }
`;
