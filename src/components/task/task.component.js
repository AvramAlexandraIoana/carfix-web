import React from "react";
import { AuditOutlined , ArrowRightOutlined} from "@ant-design/icons";
import { Badge } from "antd";
import {
  TaskWrapper,
  InfoTop,
  CarNumberWrapper,
  DateWrapper,
  IDWrapper,
  StateWrapper,
  MakeWrapper,
  InfoBottom,
  InfoWrapper,
  ModelWrapper,
  MakeAndModelWrapper,
  StateWrapperRejected,
  StateWrapperNew,
  StateWrapperApproved,
  Information
} from "./task.style";

import { useHistory } from "react-router-dom";
import righticonpng from "../../assets/gif/right-arrow-icon.png";
export default function Task(props) {
  let history = useHistory();
  const { task } = props;
  const { task_type, task_id, car_make, car_model, car_registration_number, created_at, task_status } = task;

  const getDate = () => {
    const date = created_at.slice(0, 10);
    const dateArray = date.split("-");

    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return `${day}-${month}-${year}`;
  };
  const renderStatusCode = () => {
    if (task_status.code === "STATE_REJECTED") {
      return <StateWrapperRejected className="StateWrapperRejected">{task_status.name}</StateWrapperRejected>;
    }
    if (task_status.code === "STATE_NEW") {
      return <StateWrapperNew className="StateWrapperNew">{task_status.name}</StateWrapperNew>;
    }
    if (task_status.code === "STATE_APPROVED") {
      return <StateWrapperApproved className="StateWrapperApproved">{task_status.name}</StateWrapperApproved>;
    }

    return <StateWrapper className="StateWrapper">{task_status.name}</StateWrapper>;
  };

  const renderTask = () => (
    <TaskWrapper className={`TaskWrapper ${task_status.name.replace(" ", "-")}`} onClick={() => history.push({ pathname: "/task", search: `?id=${task_id}` })}>
      <InfoWrapper className="InfoWrapper">
        <InfoTop className="InfoTop">
           <CarNumberWrapper className="CarNumberWrapper">{car_registration_number}</CarNumberWrapper>
          {renderStatusCode()}
        </InfoTop>
        <Information className="InfoTop">
          <DateWrapper className="DateWrapper">{getDate()}</DateWrapper>
        </Information>
        <Information className="InfoTop">
            <MakeWrapper className="MakeWrapper">{car_make}</MakeWrapper>
        </Information>
        <Information className="InfoTop">
          IR | #  {task_id}
        </Information>
        <Information className="InfoTop">
          Vezi detalii
          <img src={righticonpng} />
        </Information>


      </InfoWrapper>
    </TaskWrapper>
  );

  if (task_status.code === "STATE_REJECTED") {
    return <Badge status="error">{renderTask()}</Badge>;
  }

  if (task_status.code === "STATE_APPROVED") {
    return <Badge status="success">{renderTask()}</Badge>;
  }

  return renderTask();
}
