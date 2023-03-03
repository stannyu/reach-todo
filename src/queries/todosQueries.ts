import { queryClient } from "./QueryClient";
import {
  addTodo,
  deleteTodo,
  getTodos,
  todosApi,
  updateTodo,
} from "../http/todosApi";
import { TodoType } from "../types/todo";

const getTodoQuery = {
  queryKey: ["todos"],
  queryFn: getTodos,
  select: (data: TodoType[]) => data.filter((d: TodoType) => d.userId === 1),
};

const getTodosByGroup = async (
  groupId: number | null
): Promise<TodoType[] | null> => {
  if(!groupId) return null;
  const res = await todosApi.get<TodoType[]>(`/todos?groupId=${groupId}`);
  let todos = res.data;
  return todos;
};

const addTodoMutationQuery = {
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
};

const updateTodoMutationQuery = {
  mutationFn: updateTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
};

const deleteTodoMutationQuery = {
  mutationFn: deleteTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
};

export {
  addTodoMutationQuery,
  updateTodoMutationQuery,
  deleteTodoMutationQuery,
  getTodoQuery,
  getTodosByGroup,
};
