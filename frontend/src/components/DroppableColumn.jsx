import React from "react";
import Task from "./task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function Column({ tasks }) {
  return (
    <div className="bg-light-yellow rounded border-dark-blue border min-h-full p-5">
      {tasks.map((task) => (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <Task id={task.id} title={task.title} key={task.id} />
        </SortableContext>
      ))}
    </div>
  );
}

export default Column;
