import { queryClient } from "./QueryClient";
import {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupById,
} from "../http/groupsApi";
import { GroupType } from "../types/group";
import { useQuery } from "@tanstack/react-query";

const getGroupQuery = {
  queryKey: ["groups"],
  queryFn: getGroups,
  select: (data: GroupType[]) => data,
};

const useGroupById = (groupId: string) => {
    return useQuery({ queryKey: ["groups"], queryFn: () => getGroupById(groupId) });
  };

const addGroupMutationQuery = {
  mutationFn: addGroup,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  },
};

const updateGroupMutationQuery = {
  mutationFn: updateGroup,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  },
};

const deleteGroupMutationQuery = {
  mutationFn: deleteGroup,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  },
};

export {
  addGroupMutationQuery,
  updateGroupMutationQuery,
  deleteGroupMutationQuery,
  getGroupQuery,
  useGroupById
};
