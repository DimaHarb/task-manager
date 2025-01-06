import React from "react";
import { useDrag } from "react-dnd";
import "../styles/Task.css";

function Task({ task }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, column: task.column, order: task.order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const darkenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.max((num >> 16) - amount, 0);
    const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
    const b = Math.max((num & 0x0000ff) - amount, 0);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  };

  const borderColor = task.tagColor ? darkenColor(task.tagColor, 40) : "#aaa";

  return (
    <div
      ref={dragRef}
      className="task"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      
      <div
        className="tag"
        style={{
          backgroundColor: task.tagColor || "#ccc",
          borderColor: borderColor, 
        }}
      >
        {task.tag || "No Tag"}
      </div>

      <div className="content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
    </div>
  );
}

export default Task;
