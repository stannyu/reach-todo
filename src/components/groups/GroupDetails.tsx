import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { debounce, throttle } from "lodash";

import { useGroupById } from "../../queries/groupQueries";

const GroupDetails = (): React.ReactElement => {
  const [count, setCount] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);
  const { groupId } = useParams();
  // @ts-ignore
  const { data: gr } = useGroupById(groupId);

  const throttledFn = throttle(() => {
    console.log("throttled");
    setCount(count + 1);

    // if(inputRef && inputRef.current) {
    //   console.log(inputRef.current.value);
    // }
  }, 500);

  const debouncedFn = debounce(() => {
    console.log("debounced");
    setCount(count + 1);
  }, 400);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    throttledFn()
  };

  const handleAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // throttledFn();
    // debouncedFn();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs input-bordered"
        onChange={handleAddTodo}
      />
      {/* <button className="btn btn-ghost ml-2" onClick={handleAddTodo}>
          Add ToDo
        </button> */}
      {/* Group details: {groupId}
      <p>{gr && gr?.title}</p> */}

      <div className="font-mono text-5xl">{count}</div>
      <div
        className="w-5/12 overflow-y-scroll h-80 border-orange-300 border-solid border-4 relative"
        onScroll={handleScroll}
      >
        <div className="h-[10000px] w-full"></div>
      </div>
    </div>
  );
};

export default GroupDetails;
