import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FunctionComponent, useRef } from "react";
import classNames from "classnames";

import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import { GroupType } from "../../types/group";
import { getRandomInt } from "../../utils/utils";
import {
  addGroupMutationQuery,
  deleteGroupMutationQuery,
} from "../../queries/groupQueries";

type SidebarProps = {
  isSidebarOpen: boolean;
  onHandleSidebarToggel: () => void;
  onHandleGroupClick: (groupId: number) => void;
  isLoading: boolean;
  isError: boolean;
  groupsData?: GroupType[];
};

const Sidebar: FunctionComponent<SidebarProps> = ({
  isSidebarOpen,
  onHandleGroupClick,
  onHandleSidebarToggel,
  isLoading,
  isError,
  groupsData,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addGroupMutation = useMutation(addGroupMutationQuery);
  const deleteGroupMutation = useMutation(deleteGroupMutationQuery);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error happened</p>;
  }

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef || !inputRef.current || inputRef.current.value.length === 0)
      return;

    const groupToAdd: GroupType = {
      id: getRandomInt(50, 10000),
      title: inputRef.current.value,
    };

    addGroupMutation.mutate(groupToAdd);

    inputRef.current.value = "";
  };

  const handleDeleteGroup = (groupId: number): void => {
    deleteGroupMutation.mutate(groupId);
  };

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
      <div className="input_area border-b-4 border-b-orange-300 border-dashed mb-4 text-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Group"
          className="input w-10/12 max-w-xs input-bordered"
        />
        <button
          className="btn btn-info ml-auto mb-3 mt-3"
          onClick={handleAddGroup}
        >
          Add Group
        </button>
      </div>
      {groupsData &&
        groupsData.length > 0 &&
        groupsData.map((group) => (
          <div
            key={group.id}
            className="menu p-2 shadow bg-base-100 cursor-pointer w-auto hover:bg-slate-200"
            onClick={() => onHandleGroupClick(group.id)}
          >
            <p className="flex justify-between flex-row">
              {group.title}
              <span onClick={() => handleDeleteGroup(group.id)}>X</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
