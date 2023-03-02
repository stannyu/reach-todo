import React from "react";
import { useParams } from "react-router-dom";
import { useGroupById } from "../../queries/groupQueries";

const GroupDetails = () => {
  const { groupId } = useParams();
  // @ts-ignore
  const { data: gr } = useGroupById(groupId);

  return (
    <div>
      Group details: {groupId}
      <p>{gr && gr?.title}</p>
    </div>
  );
};

export default GroupDetails;
