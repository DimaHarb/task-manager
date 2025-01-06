import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModal";
import "../styles/Column.css"

function Column({ title, tasks, columnKey, onMoveTask, onReorderTask, onCreateTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (draggedItem, monitor) => {
      const dropPosition = monitor.getClientOffset();
      const taskElements = document.querySelectorAll(`.column[data-column="${columnKey}"] .task`);
      const targetIndex = Array.from(taskElements).findIndex((el) => {
        const rect = el.getBoundingClientRect();
        return dropPosition.y >= rect.top && dropPosition.y <= rect.bottom;
      });

      const isSameColumn = draggedItem.column === columnKey;

      if (isSameColumn) {
        onReorderTask(draggedItem.id, targetIndex, columnKey); 
      } else {
        onMoveTask(draggedItem.id, columnKey, targetIndex); 
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`column flex flex-col bg-white border border-black  ${
        isOver ? "bg-gray-100" : ""
      }`}
      data-column={columnKey}
      style={{
        height: "calc(100vh - 200px)", 
      }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {tasks
          .sort((a, b) => a.order - b.order) 
          .map((task) => (
            <Task key={task.id} task={task} />
          ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className=" create-button py-1 bg-blue-100 text-black text-center font-medium  border border-2 border-blue-300 hover:bg-blue-200"
      >
        Create a card
      </button>

      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
          columnKey={columnKey}
          onCreateTask={onCreateTask}
        />
      )}
    </div>
  );
}

export default Column;



