import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { FunctionComponent, useRef } from "react";
import {
  addTodoMutationQuery,
  deleteTodoMutationQuery,
} from "../../queries/todosQueries";

import { TodoType } from "../../types/todo";
import TodoListItem from "../todos/TodoListItem";
import TodosList from "../todos/TodosList";

type BoardProps = {
  isSidebarOpen: boolean;
  activeGroup: string | null;
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

    const todoToAdd: Omit<TodoType, '_id'> = {
      title: inputRef.current.value,
      completed: false,
      group: activeGroup,
    };

    addTodoMutation.mutate(todoToAdd);

    inputRef.current.value = "";
  };

  const handleAsync = async () => {
    // let res1 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    // let res2 = await axios.get("https://jsonplaceholder.typicode.com/todos/2");
    // let res3 = await axios.get("https://jsonplaceholder.typicode.com/todos/3");

    // console.log('RES --> ', [res1.data, res2.data, res3.data]);

    let result: any = [];

    // Promise all --> wait everyone and 1 error result in error
    // allSettled  --> wait everything and deliver data & errors
    // race        --> wait only for the 1 one to finish, return data || error on this one
    // any         --> wait for first successfull, return only data
    Promise.allSettled([
      axios.get("https://jsonplaceholder.typicode.com/todos/1"),
      axios.get("https://jsonplaceholder.typicode.com/todosdsdas/2"),
      axios.get("https://jsonplaceholder.typicode.com/todos/3"),
    ]).then((res) => {
      // result.push(res.data);
      res.forEach((r) => result.push(r));
    });

    console.log(result);
  };

  return (
    <div
      className={classNames("content_area", {
        content_expanded: !isSidebarOpen,
      })}
    >
      <button className="btn btn-circle btn-primary" onClick={handleAsync}>
        click
      </button>
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
        <h2 className="font-mono text-2xl my-3 underline hover:no-underline cursor-pointer">
          Selected group id: {activeGroup ? activeGroup : "no group selected"}
        </h2>
        {todosData && todosData.length > 0 && (
          <TodosList todosData={todosData} />
        )}
      </div>
    </div>
  );
};

export default Board;
