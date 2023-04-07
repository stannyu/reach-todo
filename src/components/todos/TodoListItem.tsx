import { useMutation } from "@tanstack/react-query";
import React, { FunctionComponent } from "react";
import {
  deleteTodoMutationQuery,
  updateTodoMutationQuery,
} from "../../queries/todosQueries";
import { TodoType } from "../../types/todo";

type ToDoItemProps = {
  todo: TodoType;
};

const TodoListItem: FunctionComponent<ToDoItemProps> = ({
  todo,
}): JSX.Element => {
  const updateTodoMutation = useMutation(updateTodoMutationQuery);
  const deleteTodoMutation = useMutation(deleteTodoMutationQuery);

  const todoStatusToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const deleteTodoHandler = (): void => {
    if (todo._id) {
      deleteTodoMutation.mutate(todo._id);
    }
  };

  return (
    <div className="menu p-2 shadow bg-base-100 cursor-pointer w-auto flex justify-start flex-row hover:bg-slate-200">
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        className="checkbox"
        onChange={todoStatusToggle}
      />
      <p className="flex-grow mx-3">{todo.title}</p>
      <button
        className="btn btn-active btn-ghost btn-sm"
        onClick={deleteTodoHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoListItem;
