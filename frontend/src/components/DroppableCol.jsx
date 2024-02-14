import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";
// function Droppable(props) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: props.id,
//   });
//   const style = {
//     color: isOver ? "green" : undefined,
//   };

//   return (
//     <div
//       className="border-2 bg-light-orange m-5 p-5 min-h-screen"
//       ref={setNodeRef}
//       style={style}
//     >
//       <div>{props.name}</div>
//       {props.children}
//     </div>
//   );
// }

const DroppableCol = (props) => {
  const { setNodeRef } = useDroppable({ id: props.title });

  return (
    <article className="">
      <h1>{props.title}</h1>
      <div className="" />
      <SortableContext id={props.title} items={props.tasks}>
        <ul
          ref={setNodeRef}
          className="border-2 bg-light-orange m-5 p-5 min-h-screen"
        >
          {props.tasks.map((task) => (
            <DraggableTask key={task} title={task} />
          ))}
        </ul>
      </SortableContext>
    </article>
  );
};

export default DroppableCol;
