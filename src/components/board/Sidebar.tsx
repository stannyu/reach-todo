import { useQuery } from "@tanstack/react-query";
import React, { FunctionComponent } from "react";
import classNames from "classnames";

import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import { GroupType } from "../../types/group";

type SidebarProps = {
  isSidebarOpen: boolean;
  onHandleSidebarToggel: () => void;
  onHandleGroupClick: (groupId: number) => void;
  isLoading: boolean;
  isError: boolean;
  groupsData?: GroupType[]
};

const Sidebar: FunctionComponent<SidebarProps> = ({
  isSidebarOpen,
  onHandleGroupClick,
  onHandleSidebarToggel,
  isLoading,
  isError,
  groupsData
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error happened</p>;
  }

  return (
    <div
      className={classNames("sidebar_area", {
        sidebar_collapsed: !isSidebarOpen,
      })}
    >
      <div
        className={classNames("menu_toggler", {
          closed_toggler: isSidebarOpen,
        })}
        onClick={onHandleSidebarToggel}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      {groupsData &&
        groupsData.length > 0 &&
        groupsData.map((group) => (
          <div
            key={group.groupId}
            className="menu p-2 shadow bg-base-100 cursor-pointer w-auto hover:bg-slate-200"
            onClick={() => onHandleGroupClick(group.groupId)}
          >
            {group.title}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
