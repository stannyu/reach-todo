import axios, { AxiosResponse } from 'axios';
import { TodoType } from '../types/todo';
import { todosApi } from './apiInstance';

const getTodos = async (): Promise<TodoType[]> => {
  const response = await todosApi.get<TodoType[]>('/todos');
  let todos = response.data;
  return todos;
};

const getTodosByGroup = async (
  groupId: number | null
): Promise<TodoType[] | null> => {
  if(!groupId) return null;
  const res = await todosApi.get<TodoType[]>(`/todos?groupId=${groupId}`);
  let todos = res.data;
  return todos;
};

const addTodo = async (todo: TodoType): Promise<AxiosResponse<TodoType, any>> => {
  return await todosApi.post<TodoType>('/todos', todo);
};

const updateTodo = async (todo: TodoType) => {
  return await todosApi.patch<TodoType>(`/todos/${todo.id}`, todo);
};

const deleteTodo = async (todoId: string) => {
  return await todosApi.delete(`/todos/${todoId}`);
};

export { todosApi, getTodos, getTodosByGroup, addTodo, updateTodo, deleteTodo };
