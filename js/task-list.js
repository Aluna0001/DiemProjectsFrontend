
document.addEventListener("DOMContentLoaded", () => {
  const subProjectId = localStorage.getItem("subProjectId");
  const taskListContainer = document.getElementById("task-list-container");

  if (!subProjectId) {
    alert("No subproject selected.");
    window.location.href = "subproject-list.html";
    return;
  }

  fetch(`http://localhost:8080/subprojects/${subProjectId}/tasks`)
      .then(response => response.json())
      .then(tasks => {
        tasks.forEach(task => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
          <strong>${task.title}</strong> - ${task.description}<br>
          <em>Status:</em> ${task.status}<br>
          <em>Time:</em> Est. ${task.estimatedTime}h / Spent ${task.spentTime}h<br>
          <em>Cost:</em> Est. $${task.estimatedCost} / Spent $${task.spentCost}
        `;

          // Create button container
          const buttonContainer = document.createElement("div");
          buttonContainer.className = "action-buttons";

          // Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.className = "action-button";
          editButton.addEventListener("click", () => {
            localStorage.setItem("editTask", JSON.stringify(task));
            location.href = "create-task.html";
          });

          // Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.className = "action-button";
          deleteButton.addEventListener("click", () => {
            if (confirm(`Delete task "${task.title}"?`)) {
              fetch(`http://localhost:8080/tasks/${task.id}`, {
                method: "DELETE",
              })
                  .then(res => {
                    if (res.ok) {
                      listItem.remove();
                      alert("Task deleted.");
                    } else {
                      alert("Failed to delete task.");
                    }
                  })
                  .catch(error => {
                    console.error("Error deleting task:", error);
                  });
            }
          });

          buttonContainer.appendChild(editButton);
          buttonContainer.appendChild(deleteButton);
          listItem.appendChild(buttonContainer);
          taskListContainer.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error loading tasks:", error);
      });
});
