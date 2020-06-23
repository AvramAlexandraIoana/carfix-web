import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/app.context";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ScrollMemory from "react-router-scroll-memory";

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

import {
  LoginPage,
  SettingsPage,
  AddCarPage,
  EditCarPage,
  ViewCarPage,
  TasksPage,
  TaskPage,
  RegisterPage,
  GeneralActionsPage,
  ForgotPasswordPage,
  NewDamagePage,
  PickRolePage,
  DashboardPage,
  GaragePage,
  DeveloperRoom,
  DocumentPage,
  WelcomePage,
} from "./pages";

import {
  StepPickCar,
  StepPolicy,
  StepDocumentsInjured,
  StepDocumentsGuilty,
  StepInsurance,
  StepDeclarant,
  StepOtherDocuments,
  StepGuilty,
  StepGeneralPhotos,
  StepLocation,
  StepSummary,
  StepMap2D,
  StepPickClient,
  StepCustom,
} from "./pages/new-damage/subpages";
import { Footer } from "./components";

import { ContentWrapper } from "./Navigations.style";

// Settings subpages;
import { Profile, LegalPage, NotificationPage } from "./pages/settings/subpages";

export default function Navigation() {
  const { user, setUser } = useContext(AppContext);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (localStorage["user"]) {
      setUser(JSON.parse(localStorage["user"]));
    }

    setUserChecked(true);
  }, []);

  if (!userChecked) {
    return <div>Loading</div>;
  }

  return (
    <Router>
      <ScrollMemory elementID="TasksPageWrapper" />
      <ContentWrapper>
        <Switch>
          {/* New user */}
          <Route exact path="/">
            <PickRolePage />
          </Route>

          <Route path="/welcome">
            <WelcomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>

          {/* Dashboard */}

          <PrivateRoute path="/dashboard">
            <DashboardPage />
          </PrivateRoute>

          <PrivateRoute path="/garage">
            <GaragePage />
          </PrivateRoute>
          {/* Dashboard - Tasks */}
          <PrivateRoute path="/tasks">
            <TasksPage />
          </PrivateRoute>
          <PrivateRoute path="/document">
            <DocumentPage />
          </PrivateRoute>
          <PrivateRoute path="/developer-room">
            <DeveloperRoom />
          </PrivateRoute>

          <PrivateRoute exact path="/task">
            <TaskPage />
          </PrivateRoute>

          {/* General actions */}
          <PrivateRoute path="/add-car">
            <AddCarPage />
          </PrivateRoute>
          <PrivateRoute path="/view-car">
            <ViewCarPage />
          </PrivateRoute>
          <PrivateRoute path="/edit-car">
            <EditCarPage />
          </PrivateRoute>
          <PrivateRoute path="/general-actions">
            <GeneralActionsPage />
          </PrivateRoute>
          <PrivateRoute path="/new-damage">
            <NewDamagePage />
          </PrivateRoute>
      

          {/* Steps */}
          <PrivateRoute path="/step-damage-policy">
            <StepPolicy />
          </PrivateRoute>
          <PrivateRoute path="/step-pick-client">
            <StepPickClient />
          </PrivateRoute>
          <PrivateRoute path="/step-general-photos">
            <StepGeneralPhotos />
          </PrivateRoute>
          <PrivateRoute path="/step-declarant">
            <StepDeclarant />
          </PrivateRoute>
          <PrivateRoute path="/step-guilty">
            <StepGuilty />
          </PrivateRoute>
          <PrivateRoute path="/step-location">
            <StepLocation />
          </PrivateRoute>

          <PrivateRoute path="/step-pick-car">
            <StepPickCar />
          </PrivateRoute>
          <PrivateRoute path="/step-other-documents">
            <StepOtherDocuments />
          </PrivateRoute>

          <PrivateRoute path="/step-documents-injured">
            <StepDocumentsInjured />
          </PrivateRoute>

          <PrivateRoute path="/step-insurance">
            <StepInsurance />
          </PrivateRoute>
          <PrivateRoute path="/step-map-2d">
            <StepMap2D />
          </PrivateRoute>
          <PrivateRoute path="/step-summary">
            <StepSummary />
          </PrivateRoute>
          <PrivateRoute path="/step-custom">
            <StepCustom />
          </PrivateRoute>

          <PrivateRoute path="/step-documents-guilty">
            <StepDocumentsGuilty />
          </PrivateRoute>

          {/* Settings */}
          <PrivateRoute path="/settings">
            <SettingsPage />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <PrivateRoute path="/legal">
            <LegalPage />
          </PrivateRoute>
          <PrivateRoute path="/notification">
            <NotificationPage />
          </PrivateRoute>

          <Route path="*">
            <div>PAGINA 404</div>
          </Route>
        </Switch>
      </ContentWrapper>
      {user && <Footer />}
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: localStorage["welcomeTutorial"] ? "/" : "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
