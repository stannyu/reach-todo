import { useQuery } from "@tanstack/react-query";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { getTodosByGroup } from "../http/todosApi";
import { getGroupQuery } from "../queries/groupQueries";
import { GroupType } from "../types/group";

/**
 * dashboard with sidebar
 * sidebar contains groups, groups and todos for selected group are fetched on root level, the first group in the list is selected one
 * main area contains list of todos for selected group
 * there is a possibility to create todo, mark todo done/undo from main area
 * there is a possibility to create group from sidebar
 * header to navigate to main page, login page, landing page
 *
 *
 * @returns Root Component
 */

const Root = (): React.ReactElement => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const {
    data: groupsData,
    isLoading,
    isError,
    error,
  } = useQuery(getGroupQuery);

  const { data: todosData } = useQuery({
    queryKey: ["todos", activeGroup],
    queryFn: () => getTodosByGroup(activeGroup),
  });

  useEffect(() => {
    if (groupsData && groupsData?.length > 0)
      console.log("QUERY: ", groupsData);
  }, [groupsData]);

  const isGroupsData = (): boolean => !!(groupsData && groupsData.length > 0);
  const handleGroupSelect = (group: GroupType): void => {
    console.log("Group is ---> ", group, typeof group.groupId);
    setActiveGroup(group.groupId);
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
        <p>🤷🏽</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error is</p>
      </div>
    );
  }

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline text-orange-500 hover:no-underline cursor-pointer">
        Root component
      </h1>
      <h2>Active group is: {activeGroup}</h2> */}

      {/* <div className="container w-80 bg-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid saepe
        optio numquam nesciunt nobis magni vero tempore ab beatae dolores
        excepturi, veniam dolorum esse culpa perspiciatis rem distinctio
        officiis eum omnis at sequi perferendis, soluta corporis. Ipsum quia
        autem eligendi rem vero delectus fuga minima praesentium sit, et hic
        laborum nobis. Rerum saepe facere maxime aperiam asperiores, repellat
        adipisci. Adipisci aliquam eius nihil reiciendis soluta. Eaque dolore
        minima dolor ea nulla ipsam? Et, odit? Explicabo veniam dicta facilis
        quaerat officia recusandae, a incidunt pariatur ipsum, esse adipisci
        blanditiis quod ullam velit voluptatem beatae laudantium hic eveniet,
        quos culpa. Assumenda animi hic modi illo sequi consectetur dolore
        reprehenderit rem suscipit accusamus libero inventore iste, soluta in
        voluptates amet cum recusandae? Nemo, architecto explicabo cumque
        dolorum, dignissimos tempora neque assumenda earum ratione id nesciunt
        temporibus itaque porro? Quam voluptatibus ipsum numquam vel
        perspiciatis animi, unde iste maiores ratione tempore incidunt
        consequuntur quia velit nostrum neque enim sapiente voluptate est quos.
        Magnam porro id culpa totam facilis unde, necessitatibus dolore harum
        atque obcaecati itaque architecto autem quod, voluptatem dolor ullam
        sunt quo aliquid cum? Molestiae corrupti minima quae maiores atque sit
        laboriosam pariatur optio dolorem aliquid accusamus, incidunt deleniti
        sint consequatur eligendi aspernatur.
      </div> */}

      {isGroupsData() &&
        groupsData.map((t) => (
          <div onClick={() => handleGroupSelect(t)} key={t.groupId}>
            {t.title}
          </div>
        ))}

      {todosData &&
        todosData.map((t) => (
          <div key={t.id} onClick={() => console.log("todo ---> ", t)}>
            {t.title}
          </div>
        ))}
    </>
  );
};

export default Root;