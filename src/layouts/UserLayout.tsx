import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserLayout = (): React.ReactElement => {
  return (
    <div>
      <h1>🙍🏻‍♂️User Layout:</h1>
      <nav>
        <Link to="/" className="link link-info">
          - 🏡 Home
        </Link>
        <Link to="profile" className="link link-info">
          - Profile
        </Link>
        <Link to="account" className="link link-info">
          - Account
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default UserLayout;
