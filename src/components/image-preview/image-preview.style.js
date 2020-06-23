import styled from "styled-components";

export const ImageFullScreenWrapper = styled.div`
  height: calc(100vh - 64px);
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  background: #101010;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: calc(100vh - 64px);
    width: 100%;
  }
`;

export const ImageFullScreenHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  backdrop-filter: blur(61px);
  background: #00000017;
  z-index: 1;
  padding: 32px;
`;

export const ImageFullScreenActionWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  backdrop-filter: blur(61px);
  background: #00000017;
  padding: 32px;
`;

export const ImageThumbnailWrapper = styled.div`
  align-items: center;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 110px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  img {
    width: 100%;
  }

  .ImageTitle {
    position: absolute;
    background: #ffffff60;
    bottom: 0;
    left: 0;
    padding: 4px;
    width: 100%;
    font-size: 12px;
    text-align: center;
    backdrop-filter: blur(10px);
  }
`;
export const IconWrapper = styled.span`
	position: relative;
	display: unset !important;
	span {
		svg {
			background: #10E4E4;
			border-radius: 10px;
		}
	}
`;
