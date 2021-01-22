import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Account from "../pages/Account/components/Account";
import { CovidInfo } from "../pages/CovidInfo/CovidInfo";
import Home from "../pages/Home/components/Home";
import { InstructionSlides } from "../pages/InstructionSlides/components/InstructionSlides";
import LiveTracing from "../pages/LiveTracing/components/LiveTracing";
import { News } from "../pages/News/components/News";
import PersonalInfo from "../pages/PersonalInfo/components/PersonalInfo";
import UpdateInfo from "../pages/PersonalInfo/components/UpdateInfo";
import SelfCheck from "../pages/SelfCheck/components/SelfCheck";
import Testing from "../pages/Testing/components/Testing";
import { Login } from "../pages/User/components/Login";
import Registration from "../pages/User/components/Registration";
import SwabTest from "../pages/Testing/components/SwabTest";
import MySwabTest from "../pages/Testing/components/MySwabTest";
import DriveTest from "../pages/Testing/components/DriveThroughTest";
import ClinicTest from "../pages/Testing/components/ClinicTest";
import MyTests from "../pages/Testing/components/MyTests";
import {
  ACCOUNT_URL,
  COVID_INFO_URL,
  CUSTOMER_RECORD_URL,
  HOME_URL,
  INSTRUCTION_URL,
  LIVE_TRACING_URL,
  LOGIN_URL,
  NEWS_URL,
  PERSONAL_INFO_URL,
  REGISTRATION_URL,
  SELF_CHECK_URL,
  TESTING_URL,
  SWAB_TEST_URL,
  MY_SWABTEST_URL,
  CLINIC_URL,
  DRIVE_URL,
  GENERAL_UPDATE_INFO_URL,
  MY_TESTS_URL,
} from "./URLMAP";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CustomerRecords } from "../pages/CustomerRecords/components/CustomerRecords";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/"
        render={() => <Redirect to={INSTRUCTION_URL} />}
        exact={true}
      />
      <ProtectedRoute
        path={INSTRUCTION_URL}
        component={InstructionSlides}
        exact={true}
      />
      <Route
        path={`${REGISTRATION_URL}/:userType`}
        component={Registration}
        // exact={true}
      />
      <Route path={`${LOGIN_URL}/:userType`} component={Login} />
      <ProtectedRoute path={HOME_URL} component={Home} exact={true} />
      <ProtectedRoute
        path={COVID_INFO_URL}
        component={CovidInfo}
        exact={true}
      />
      <ProtectedRoute
        path={SELF_CHECK_URL}
        component={SelfCheck}
        exact={true}
      />
      <ProtectedRoute
        path={PERSONAL_INFO_URL}
        component={PersonalInfo}
        exact={true}
      />
      <ProtectedRoute
        path={GENERAL_UPDATE_INFO_URL}
        component={UpdateInfo}
        exact={true}
      />
      <ProtectedRoute
        path={LIVE_TRACING_URL}
        component={LiveTracing}
        exact={true}
      />
      <ProtectedRoute path={TESTING_URL} component={Testing} exact={true} />
      <ProtectedRoute path={SWAB_TEST_URL} component={SwabTest} exact={true} />
      <ProtectedRoute
        path={MY_SWABTEST_URL}
        component={MySwabTest}
        exact={true}
      />
      <ProtectedRoute path={DRIVE_URL} component={DriveTest} exact={true} />
      <ProtectedRoute path={CLINIC_URL} component={ClinicTest} exact={true} />
      <ProtectedRoute path={ACCOUNT_URL} component={Account} exact={true} />
      <ProtectedRoute
        path={CUSTOMER_RECORD_URL}
        component={CustomerRecords}
        exact={true}
      />
      <ProtectedRoute path={NEWS_URL} component={News} exact={true} />
      <ProtectedRoute path={MY_TESTS_URL} component={MyTests} exact={true} />
    </Switch>
  );
};
