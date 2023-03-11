import axios, { AxiosResponse } from "axios";
import { TodoType } from "../types/todo";
import { todosApi } from "./apiInstance";

const getTodos = async (): Promise<TodoType[]> => {
  const response = await todosApi.get<TodoType[]>("/todos");
  let todos = response.data;
  return todos;
};

const getTodosByGroup = async (
  groupId: string | null
): Promise<TodoType[] | null> => {
  if (!groupId) return null;
  const res = await todosApi.get<TodoType[]>(`/todos/bygroup?group=${groupId}`);
  let todos = res.data;
  return todos;
};

const addTodo = async (
  todo: Omit<TodoType, "_id">
): Promise<AxiosResponse<TodoType, any>> => {
  console.log(todo);
  return await todosApi.post<TodoType>("/todos", todo);
};

const updateTodo = async (todo: TodoType) => {
  const { completed, group, title } = todo;
  return await todosApi.put<TodoType>(`/todos/${todo._id}`, {
    completed,
    group,
    title,
  });
};

const deleteTodo = async (todoId: string) => {
  return await todosApi.delete(`/todos/${todoId}`);
};

export { todosApi, getTodos, getTodosByGroup, addTodo, updateTodo, deleteTodo };
