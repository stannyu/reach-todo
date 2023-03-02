import axios from 'axios';
import { GroupType } from '../types/group';
import { TodoType } from '../types/todo';
import { todosApi } from './apiInstance';

const getGroups = async () => {
  const response = await todosApi.get<GroupType[]>('/groups');
  let groups = response.data;
  return groups;
};

const getGroupById = async (groupId: string) => {
  const res = await todosApi.get<GroupType[]>(`/groups?groupId=${groupId}`)
  let group = res.data;
  return group[0];
}

const addGroup = async (group: GroupType) => {
  return await todosApi.post<GroupType>('/groups', group);
};

const updateGroup = async (group: GroupType) => {
  return await todosApi.patch<GroupType>(`/groups/${group.groupId}`, group);
};

const deleteGroup = async (groupId: number) => {
  return await todosApi.delete(`/groups/${groupId}`);
};

export { todosApi, getGroups, addGroup, updateGroup, deleteGroup, getGroupById };
