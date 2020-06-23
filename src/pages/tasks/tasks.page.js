import React, { useContext, useEffect } from "react";

import { Affix } from "antd";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";

import { AppContext } from "../../context/app.context";

import {
  TasksPageWrapper,
  TabsWrapper,
  TabButton,
  TasksPageContent,
} from "./tasks.style";
import { FancyHeader } from "../../components";


import ToBeValidateSubpage from "./subpages/to-be-validate/to-be-validate.subpage";
import NewSubpage from "./subpages/new/new.subpage";
import ClosedSubpage from "./subpages/closed/closed.subpage";

export default function TasksPage() {
  const history = useHistory();
  const location = useLocation();
  const { user, getTasks, tasks } = useContext(AppContext);

  useEffect(() => {
    // if (
    // 	tasks.STATE_APPROVED.length <= 0 &&
    // 	tasks.STATE_CLOSED.length <= 0 &&
    // 	tasks.STATE_COMPLETED.length <= 0 &&
    // 	tasks.STATE_IN_PROGRESS.length <= 0 &&
    // 	tasks.STATE_NEW.length <= 0 &&
    // 	tasks.STATE_REJECTED.length <= 0
    // ) {
    // 	getTasks(user.jwt);
    // }
    getTasks(user.jwt);
  }, []);

  if (location.pathname === "/tasks") {
    return <Redirect to="/tasks/new" />;
  }

  return (
    <TasksPageWrapper id="TasksPageWrapper" className="TasksPageWrapper">
      <FancyHeader title="Solicitari" subtitle={`Solicitarile `} />
      <Affix>
        <TabsWrapper className="buttons-top">
          <TabButton
            type={location.pathname === "/tasks/new" ? "primary" : "default"}
            onClick={() => {
              history.replace("/tasks/new");
            }}
          >
            Noi
          </TabButton>
          <TabButton
            type={
              location.pathname === "/tasks/to-be-validate"
                ? "primary"
                : "default"
            }
            onClick={() => {
              history.replace("/tasks/to-be-validate");
            }}
          >
            In lucru
          </TabButton>
          <TabButton
            type={location.pathname === "/tasks/closed" ? "primary" : "default"}
            onClick={() => {
              history.replace("/tasks/closed");
            }}
          >
            Inchise
          </TabButton>
        </TabsWrapper>
      </Affix>

      <Switch>
        <Route path="/tasks/new">
          <NewSubpage />
        </Route>
        <Route path="/tasks/closed">
          <ClosedSubpage />
        </Route>
        <Route path="/tasks/to-be-validate">
          <ToBeValidateSubpage />
        </Route>
      </Switch>
    </TasksPageWrapper>
  );
}
