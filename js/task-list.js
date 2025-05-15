document.addEventListener("DOMContentLoaded", () => {
  const taskListContainer = document.getElementById("task-list-container");
  const subProjectId = localStorage.getItem("subProjectId");

  // Fetch tasks for the selected subproject
  fetch(`http://localhost:8080/subprojects/${subProjectId}/tasks`)
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        listItem.innerHTML = `
          <div>
            <strong>${task.taskTitle}</strong>
            <p>${task.taskDescription}</p>
          </div>
          <div class="action-buttons">
            <button class="action-button" title="Edit Task">Edit</button>
            <button class="action-button" title="Delete Task">Delete</button>
          </div>
        `;

        // Add event listeners for edit and delete buttons
        const editButton = listItem.querySelector("button[title='Edit Task']");
        const deleteButton = listItem.querySelector(
          "button[title='Delete Task']"
        );

        editButton.addEventListener("click", () => {
          localStorage.setItem("editTask", JSON.stringify(task));
          location.href = "create-task.html";
        });

        deleteButton.addEventListener("click", () => {
          if (confirm(`Are you sure you want to delete "${task.taskTitle}"?`)) {
            fetch(`http://localhost:8080/tasks/${task.id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  listItem.remove();
                  alert("Task deleted successfully.");
                } else {
                  alert("Failed to delete the task.");
                }
              })
              .catch((error) => {
                console.error("Error deleting task:", error);
                alert("An error occurred while deleting the task.");
              });
          }
        });

        taskListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
});
