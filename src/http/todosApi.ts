import axios from 'axios';
import { TodoType } from '../types/todo';
import { todosApi } from './apiInstance';

const getTodos = async () => {
  const response = await todosApi.get<TodoType[]>('/todos');
  let todos = response.data;
  return todos;
};

const addTodo = async (todo: TodoType) => {
  return await todosApi.post<TodoType>('/todos', todo);
};

const updateTodo = async (todo: TodoType) => {
  return await todosApi.patch<TodoType>(`/todos/${todo.id}`, todo);
};

const deleteTodo = async (todoId: string) => {
  return await todosApi.delete(`/todos/${todoId}`);
};

export { todosApi, getTodos, addTodo, updateTodo, deleteTodo };
