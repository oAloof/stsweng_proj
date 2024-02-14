import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableTask(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.title,
    });

  // Create a CSS style object for the transform property
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="border p-4 bg-ghost-white"
    >
      {props.title}
    </li>
  );
}

export default DraggableTask;
