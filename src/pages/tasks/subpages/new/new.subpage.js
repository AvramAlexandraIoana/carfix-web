import React, { useContext, useState, useEffect } from "react";

import { Skeleton, Input } from "antd";

import { TasksPageContent, SearchContent } from "../../tasks.style";
import { Task } from "../../../../components";
import { AppContext } from "../../../../context/app.context";

export default function NewSubpage() {
  const { isLoading, tasks } = useContext(AppContext);
  const [tasksLocal, setTasksLocal] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState("");

  // Order by date and reverse array
  const changeOrderTasks = (arrayP) => {
    return arrayP.sort((a, b) => a.task_id - b.task_id).reverse();
  };

  useEffect(() => {
    if (tasks) {
      setTasksLocal(changeOrderTasks([...tasks.STATE_NEW, ...tasks.STATE_IN_PROGRESS, ...tasks.STATE_REJECTED, ...tasks.STATE_APPROVED]));
    }
  }, [tasks]);

  useEffect(() => {
    if (userSearchInput) {
      renderTasks();
    }
  }, [userSearchInput]);

  const renderTasks = () => {
    //Verificarea
    const futureTasksLocal = tasksLocal.filter(
      (task) =>
        task.car_make.toLowerCase().includes(userSearchInput.toLowerCase()) ||
        task.car_registration_number.toLowerCase().includes(userSearchInput.toLowerCase()) ||
        task.created_at.toLowerCase().includes(userSearchInput.toLowerCase()) ||
        task.task_status.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
        task.task_id.toString().includes(userSearchInput.toLowerCase())
    );

    if (!futureTasksLocal.length && userSearchInput) {
      return (
        <>
          <div>Nu am găsit nimic</div>
        </>
      );
    }

    return (
      <>
        {futureTasksLocal.map((task) => (
          <Task key={`id${task.task_id}`} task={task} />
        ))}
      </>
    );
  };

  const renderSkeleton = () => <Skeleton active />;

  return (
    <>
      <SearchContent>
        <Input.Search
          placeholder="Caută..."
          value={userSearchInput}
          onChange={(e) => setUserSearchInput(e.currentTarget.value)}
          enterButton
        />
      </SearchContent>
      <TasksPageContent className="TasksPageContent">{isLoading ? renderSkeleton() : renderTasks()}</TasksPageContent>
    </>
  );
}
