import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React, { FunctionComponent, useRef } from "react";
import { addTodoMutationQuery, deleteTodoMutationQuery } from "../../queries/todosQueries";

import { TodoType } from "../../types/todo";
import TodoListItem from "../todos/TodoListItem";
import TodosList from "../todos/TodosList";

type BoardProps = {
  isSidebarOpen: boolean;
  activeGroup: number | null;
  todosData?: TodoType[] | null;
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Board: FunctionComponent<BoardProps> = ({
  isSidebarOpen,
  activeGroup,
  todosData,
}): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const addTodoMutation = useMutation(addTodoMutationQuery);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef || !inputRef.current || !activeGroup) return;

    const todoToAdd: TodoType = {
      userId: getRandomInt(1, 10),
      id: getRandomInt(50, 1000),
      title: inputRef.current.value,
      completed: false,
      group: activeGroup,
    };

    addTodoMutation.mutate(todoToAdd);

    inputRef.current.value = "";
  };

  return (
    <div
      className={classNames("content_area", {
        content_expanded: !isSidebarOpen,
      })}
    >
      <div className="input_area">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs input-bordered"
        />
        <button className="btn btn-ghost ml-2" onClick={handleAddTodo}>
          Add ToDo
        </button>
        <h2>{activeGroup ? activeGroup : "no group selected"}</h2>
        {todosData && todosData.length > 0 && (
          <TodosList todosData={todosData} />
        )}
      </div>
    </div>
  );
};

export default Board;
