import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getTags } from "../services/tagService";
import Column from "../components/Column";
import { getTasks, createTask, updateTask } from "../services/taskService";

function HomePage() {
  const [tasks, setTasks] = useState({ backlog: [], todo: [], done: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTasks = await getTasks(); 
        console.log("Fetched tasks from backend:", fetchedTasks);

       
        const organizedTasks = {
          backlog: fetchedTasks
            .filter((task) => task.column.toLowerCase() === "backlog")
            .sort((a, b) => a.order - b.order),
          todo: fetchedTasks
            .filter((task) => task.column.toLowerCase() === "todo")
            .sort((a, b) => a.order - b.order),
          done: fetchedTasks
            .filter((task) => task.column.toLowerCase() === "done")
            .sort((a, b) => a.order - b.order),
        };

        setTasks(organizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    }
    fetchData();
  }, []);

  const handleCreateTask = async (newTask, columnKey) => {
    try {
      const createdTask = await createTask({ ...newTask, column: columnKey });

      const selectedTag = newTask.tag ? await getTags() : null; 
      const tagDetails = selectedTag?.find((tag) => tag.name === newTask.tag);

      const taskWithTagColor = {
        ...createdTask,
        tagColor: tagDetails?.color || "#ccc",
      };

      setTasks((prevTasks) => ({
        ...prevTasks,
        [columnKey]: [...prevTasks[columnKey], taskWithTagColor],
      }));
    } catch (error) {
      console.error("Failed to create task:", error.message);
    }
  };

  const handleReorderTask = async (taskId, targetIndex, columnKey) => {
    try {
      await updateTask(taskId, { column: columnKey, order: targetIndex });
      const fetchedTasks = await getTasks();
      setTasks({
        backlog: fetchedTasks.filter((task) => task.column === "backlog"),
        todo: fetchedTasks.filter((task) => task.column === "todo"),
        done: fetchedTasks.filter((task) => task.column === "done"),
      });
    } catch (error) {
      console.error("Failed to reorder task:", error.message);
    }
  };

  const handleMoveTask = async (taskId, newColumn, dropIndex) => {
    try {
      await updateTask(taskId, { column: newColumn, order: dropIndex });
      const fetchedTasks = await getTasks();
      setTasks({
        backlog: fetchedTasks.filter((task) => task.column === "backlog"),
        todo: fetchedTasks.filter((task) => task.column === "todo"),
        done: fetchedTasks.filter((task) => task.column === "done"),
      });
    } catch (error) {
      console.error("Failed to move task:", error.message);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="py-6 min-h-screen">
        <header className="flex justify-end mb-4 border-b border-black pb-4">
          <a
            href="/logs"
            className="px-4 py-2 mx-3 text-black border border-blue-300 bg-blue-100 hover:bg-blue-200"
          >
            History Logs
          </a>
        </header>

        <div className="text-center text-xl mb-2">Homepage</div>
        <div
          className="grid gap-2 md:gap-12 lg:gap-24 mx-auto px-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, 300px)", 
            justifyContent: "center",
          }}
        >
          <div>
            <h2 className="text-center mb-2">Backlog</h2>
            <Column
              tasks={tasks.backlog}
              columnKey="backlog"
              onMoveTask={handleMoveTask}
              onReorderTask={handleReorderTask}
              onCreateTask={handleCreateTask}
            />
          </div>
          <div>
            <h2 className="text-center mb-2">To Do</h2>
            <Column
              tasks={tasks.todo}
              columnKey="todo"
              onMoveTask={handleMoveTask}
              onReorderTask={handleReorderTask}
              onCreateTask={handleCreateTask}
            />
          </div>
          <div>
            <h2 className="text-center mb-2">Done</h2>
            <Column
              tasks={tasks.done}
              columnKey="done"
              onMoveTask={handleMoveTask}
              onReorderTask={handleReorderTask}
              onCreateTask={handleCreateTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default HomePage;
