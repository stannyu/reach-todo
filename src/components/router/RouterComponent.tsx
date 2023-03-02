import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import BoardComponent from "../board/BoardComponent";
import GroupDetails from "../groups/GroupDetails";

import { RootLayout } from "../../layouts/RootLayout";
import { LoginComponent } from "../login/LoginComponent";

import Root from "../Root";

const RouterComponent = (): JSX.Element => {
  return <>
  <Routes>
    <Route path="/login" element={<LoginComponent />} />

    <Route path="/" element={<RootLayout />}>
      <Route index element={<Root />} />
      <Route path="home" element={<Root />} />

      <Route path="group" element={<BoardComponent />}>
        {/* <Route index element={<BoardComponent />} /> */}
      </Route>
      <Route path="/list/:groupId" element={<GroupDetails />} />

      {/* <Route path="user" element={<User />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NotFoundPageComponent />} />
      </Route> */}

      {/* <Route path="*" element={<NotFoundPageComponent />} /> */}
    </Route>

    {/* <Route path="*" element={<NotFoundPageComponent />} /> */}
  </Routes>
</>
};

export default RouterComponent;
