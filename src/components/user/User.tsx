import React from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1> 🍿 Profile component</h1>
      <Link to="/user" className="link link-info">
        {" "}
        go2user
      </Link>
    </div>
  );
};

const Account = () => {
  return (
    <div>
      <h1> 🍰 Account component</h1>
      <Link to="/user" className="link link-info">
        {" "}
        go2user
      </Link>
    </div>
  );
};

const User = (): React.ReactElement => {
  return (
    <div>
      <h1>🙍🏻‍♂️User component:</h1>
      {/* <nav>
        <Link to="/" className="link link-info">
          {" "}
          - 🏡 Home
        </Link>
        <Link to="profile" className="link link-info">
          {" "}
          - Profile
        </Link>
        <Link to="account" className="link link-info">
          {" "}
          - Account
        </Link>
      </nav> */}
      {/* <Outlet /> */}
    </div>
  );
};

export { User, Profile, Account };
