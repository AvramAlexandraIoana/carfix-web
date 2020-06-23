import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterWrapper = styled.div`
  height: 64px;
  display: flex;
  width: 100%;
z-index:999;
position: absolute;
bottom:0;
background:#fff;
  border-top: 1px solid #eee;
`;

export const FooterLinkButton = styled(Link)`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background: #f8f8f8;
  }
  span {
    margin-bottom: 4px;
  }
`;
