import React, { FunctionComponent } from "react";
import { TodoType } from "../../types/todo";
import TodoListItem from "./TodoListItem";

type TodosListProps = {
  todosData: TodoType[];
};

const TodosList: FunctionComponent<TodosListProps> = ({todosData}): JSX.Element => {
  return (
    <>
      {todosData.map((todoEl) => (
        <TodoListItem todo={todoEl} key={todoEl._id} />
      ))}
    </>
  );
};

export default TodosList;
