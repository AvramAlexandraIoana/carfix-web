import React from "react";
import { BellOutlined } from "@ant-design/icons";

import { NotificatonWrapper, InfoWrapper } from "./notification.style";
import { useHistory } from "react-router-dom";

export default function Notification({ title, message, id }) {
  const history = useHistory();
  return (
    <NotificatonWrapper
      onClick={() => {
        history.push({ pathname: "/task", search: `?id=${id}` });
      }}
    >
      <BellOutlined />
      <InfoWrapper>
        <h2>{title}</h2>
        <h3>{message}</h3>
      </InfoWrapper>
    </NotificatonWrapper>
  );
}
