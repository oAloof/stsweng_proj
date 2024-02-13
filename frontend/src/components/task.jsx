import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function task({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="border-dar-blue border bg-light-yellow p-5 m-5"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {title}
    </div>
  );
}
export default task;
