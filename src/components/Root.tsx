import { useQuery } from "@tanstack/react-query";
import React, { FunctionComponent, useEffect } from "react";
import { getGroupQuery } from "../queries/groupQueries";

import { TodoType } from "../types/todo";

const Root = (): JSX.Element => {
  const { data: groupsData, isLoading, isError, error } = useQuery(getGroupQuery);

  useEffect(() => {
    if (groupsData && groupsData?.length > 0) console.log("QUERY: ", groupsData);
  }, [groupsData]);

  

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
      {groupsData && groupsData.length > 0 && groupsData.map((t) => (
        <div key={t.groupId}>{t.title}</div>
      ))}
    </div>
  );
};

export default Root;
