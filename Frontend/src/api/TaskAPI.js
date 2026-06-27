const url = "http://localhost:3000/tasks/";

export async function GetTaskList() {
  return await fetch(`${url}GetAllTaskList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function UpdateTaskCompletion(id, completed) {
  return await fetch(`${url}UpdateTaskCompletion/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
}