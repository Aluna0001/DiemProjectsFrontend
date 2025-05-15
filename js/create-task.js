document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("createTaskForm");
  const subProjectId = localStorage.getItem("subProjectId");
  const editTaskData = localStorage.getItem("editTask");

  if (editTaskData) {
    const task = JSON.parse(editTaskData);

    // Populate the form with task data
    document.getElementById("taskTitle").value = task.taskTitle;
    document.getElementById("taskDescription").value = task.taskDescription;

    // Update the form's submit event to handle editing
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedTask = {
        taskTitle: document.getElementById("taskTitle").value,
        taskDescription: document.getElementById("taskDescription").value,
      };

      fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => {
          if (response.ok) {
            alert("Task updated successfully.");
            location.href = "task-list.html";
          } else {
            alert("Failed to update the task.");
          }
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          alert("An error occurred while updating the task.");
        });

      localStorage.removeItem("editTask");
    });
  } else {
    // Handle creating a new task
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTask = {
        taskTitle: document.getElementById("taskTitle").value,
        taskDescription: document.getElementById("taskDescription").value,
      };

      fetch(`http://localhost:8080/subprojects/${subProjectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (response.ok) {
            alert("Task created successfully.");
            location.href = "task-list.html";
          } else {
            alert("Failed to create the task.");
          }
        })
        .catch((error) => {
          console.error("Error creating task:", error);
          alert("An error occurred while creating the task.");
        });
    });
  }
});
