import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getTodosByGroup } from "../http/todosApi";
import { getGroupQuery } from "../queries/groupQueries";
import Board from "./board/BoardComponent";
import Sidebar from "./board/Sidebar";

import "./root.scss";
import TodoListItem from "./todos/TodoListItem";
/**
 * dashboard with sidebar
 * sidebar contains groups, groups and todos for selected group are fetched on root level, the first group in the list is selected one
 * main area contains list of todos for selected group
 * there is a possibility to create todo, mark todo done/undo from main area
 * there is a possibility to create group from sidebar
 * header to navigate to main page, login page, landing page
 *
 *
 * @returns Root Component
 */

const Root = (): React.ReactElement => {
  const [isSidebarOpen, setSidebarState] = useState<boolean>(true);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const { data: groupsData, isLoading, isError } = useQuery(getGroupQuery);

  const {
    data: todosData,
    isLoading: isTodosLoading,
    isError: isTodosLoadingError,
  } = useQuery({
    queryKey: ["todos", activeGroup],
    queryFn: () => getTodosByGroup(activeGroup),
  });

  useEffect(() => {
    if (groupsData && groupsData.length > 0) {
      setActiveGroup(groupsData[0].id);
    }
  }, [groupsData]);

  const handleSidebarToggle = (): void => {
    setSidebarState(!isSidebarOpen);
  };

  const handleGroupClick = (gorupId: number): void => {
    setActiveGroup(gorupId);
  };

  return (
    <>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onHandleSidebarToggel={handleSidebarToggle}
        onHandleGroupClick={handleGroupClick}
        isLoading={isLoading}
        isError={isError}
        groupsData={groupsData}
      />
      <Board
        activeGroup={activeGroup}
        isSidebarOpen={isSidebarOpen}
        todosData={todosData}
      />
    </>
  );
};

export default Root;
