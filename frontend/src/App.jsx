import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";

import Column from "./components/DroppableColumn";
import PlannerComponent from "./components/PlannerComponent";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Does" },
    { id: 2, title: "This" },
    { id: 3, title: "Work" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <PlannerComponent tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
