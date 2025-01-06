export async function getTasks() {
  const response = await fetch("http://localhost:5000/api/tasks");
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  const tasks = await response.json();
  console.log("Tasks fetched from backend:", tasks); 
  return tasks;
}




export async function createTask(task) {
  console.log("Task being sent to backend:", task);
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.statusText}`);
  }

  const createdTask = await response.json();
  console.log("Task created by backend:", createdTask);
  return createdTask;
}



export async function updateTask(taskId, data) {
  console.log("Sending update request:", { taskId, data }); 
  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }

  const updatedTask = await response.json();
  console.log("Task updated successfully:", updatedTask);
  return updatedTask;
}


