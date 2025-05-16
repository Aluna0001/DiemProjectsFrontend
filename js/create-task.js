document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("createTaskForm");
  const subProjectId = localStorage.getItem("subProjectId");
  const editTaskData = localStorage.getItem("editTask");

  if (editTaskData) {
    const task = JSON.parse(editTaskData);
    document.getElementById("formTitle").textContent = "Edit Task";

    // Populate form
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("estimatedTime").value = task.estimatedTime;
    document.getElementById("spentTime").value = task.spentTime;
    document.getElementById("estimatedCost").value = task.estimatedCost;
    document.getElementById("spentCost").value = task.spentCost;
    document.getElementById("status").value = task.status;

    // Submit handler for update
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedTask = getFormData();

      fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })
          .then((res) => {
            if (res.ok) {
              alert("Task updated.");
              location.href = "task-list.html";
            } else {
              alert("Failed to update task.");
            }
          })
          .catch(console.error);

      localStorage.removeItem("editTask");
    });
  } else {
    // Submit handler for create
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newTask = getFormData();

      fetch(`http://localhost:8080/subprojects/${subProjectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
          .then((res) => {
            if (res.ok) {
              alert("Task created.");
              location.href = "task-list.html";
            } else {
              alert("Failed to create task.");
            }
          })
          .catch(console.error);
    });
  }

  function getFormData() {
    return {
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      estimatedTime: parseFloat(document.getElementById("estimatedTime").value),
      spentTime: parseFloat(document.getElementById("spentTime").value),
      estimatedCost: parseFloat(document.getElementById("estimatedCost").value),
      spentCost: parseFloat(document.getElementById("spentCost").value),
      status: document.getElementById("status").value,
    };
  }
});