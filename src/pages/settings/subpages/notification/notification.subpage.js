import React, { useState, useRef, useContext } from "react";
import { FancyHeader, Notification } from "../../../../components";

import { NotificationPageWrapper } from "./notification.style";
import { AppContext } from "../../../../context/app.context";

export default function NotificationPage() {
  const { notifications } = useContext(AppContext);

  return (
    <NotificationPageWrapper>
      <FancyHeader title="Notificarile tale" subtitle="Aici vine un subtitlu" />

      {notifications.map((notification) => {
        console.log(notification);
        return (
          <Notification id={notification.data.task_id} key={notification.id} title={notification.title} message={notification.message} />
        );
      })}
    </NotificationPageWrapper>
  );
}
