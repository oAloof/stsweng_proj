import React from "react";
import Column from "./DroppableColumn";

function PlannerComponent({ tasks }) {
  return (
    <div className="w-3/4 flex flex-row min-h-64">
      <Column tasks={tasks} />
      <Column tasks={tasks} />
      {/* <Column tasks={null} />
      <Column tasks={null} />
      <Column tasks={null} />
      <Column tasks={null} />
      <Column tasks={null} /> */}
    </div>
  );
}
export default PlannerComponent;
