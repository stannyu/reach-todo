import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BoardComponent from "../board/BoardComponent";
import GroupDetails from "../groups/GroupDetails";

import { RootLayout } from "../../layouts/RootLayout";
import { LoginComponent } from "../login/LoginComponent";

import Root from "../Root";
import { NotFoundPageComponent } from "../404/404";
import AuthenticatedRoute from "../login/AuthenticatedRoute";
import { User, Account, Profile } from "../user/User";
import AuthenticatedParentRoute from "../login/AuthenticatedParentRoute";
import UserLayout from "../../layouts/UserLayout";

const RouterComponent = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />

        <Route path="/" element={<RootLayout />}>
          <Route index element={<Root />} />
          <Route path="home" element={<Root />} />

          <Route path="group" element={<BoardComponent />} />
          {/* <Route
            path="/list/:groupId"
            element={
              <AuthenticatedRoute isSignedIn={false}>
                <User />
              </AuthenticatedRoute>
            }
          /> */}

          <Route
            path="/list/:groupId"
            element={
              <AuthenticatedRoute isSignedIn={true}>
                <GroupDetails />
              </AuthenticatedRoute>
            }
          />

          <Route path="user" element={<AuthenticatedParentRoute isSignedIn={true} />}>
          {/* <Route
            path="user"
            element={
              <AuthenticatedRoute isSignedIn={true}>
                <UserLayout />
              </AuthenticatedRoute>
            }
          > */}
            {/* <Route path="user" element={<User />}> */}
            <Route index element={<User />} />
            <Route path="profile" element={<Profile />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFoundPageComponent />} />
          </Route>

          <Route path="*" element={<NotFoundPageComponent />} />
        </Route>

        <Route path="*" element={<NotFoundPageComponent />} />
      </Routes>
    </>
  );
};

export default RouterComponent;
