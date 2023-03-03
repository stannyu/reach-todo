import { useQuery } from "@tanstack/react-query";
import React, { FunctionComponent, useEffect, useState } from "react";
import { getGroupQuery } from "../queries/groupQueries";
import { getTodosByGroup } from "../queries/todosQueries";
import { GroupType } from "../types/group";

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

const Root = (): JSX.Element => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const {
    data: groupsData,
    isLoading,
    isError,
    error,
  } = useQuery(getGroupQuery);

  const { data: todosData } = useQuery({
    queryKey: ["todos", activeGroup],
    queryFn: () => getTodosByGroup(activeGroup),
  });

  useEffect(() => {
    if (groupsData && groupsData?.length > 0)
      console.log("QUERY: ", groupsData);
  }, [groupsData]);

  const isGroupsData = (): boolean => !!(groupsData && groupsData.length > 0);
  const handleGroupSelect = (group: GroupType): void => {
    console.log("Group is ---> ", group, typeof group.groupId);
    setActiveGroup(group.groupId);
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
        <p>🤷🏽</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error is</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Root component</h1>
      <h2>Active group is: {activeGroup}</h2>
      {isGroupsData() &&
        groupsData.map((t) => (
          <div onClick={() => handleGroupSelect(t)} key={t.groupId}>
            {t.title}
          </div>
        ))}

      {todosData &&
        todosData.map((t) => (
          <div key={t.id} onClick={() => console.log("todo ---> ", t)}>
            {t.title}
          </div>
        ))}
    </div>
  );
};

export default Root;
