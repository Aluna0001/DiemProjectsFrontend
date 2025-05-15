function updateProject(id, updatedData) {
  fetch(`http://localhost:8080/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Project updated successfully.");
        location.href = "project-list.html"; // Redirect back to the project list
      } else {
        alert("Failed to update the project.");
      }
    })
    .catch((error) => {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project.");
    });
}

function loadProjectIntoForm(project) {
  // Save project data to localStorage to pass it to the create-project page
  localStorage.setItem("editProject", JSON.stringify(project));
  location.href = "create-project.html"; // Redirect to the create-project page
}

document.addEventListener("DOMContentLoaded", () => {
  const projectListContainer = document.getElementById(
    "project-list-container"
  );

  // Fetch projects from the backend
  fetch("http://localhost:8080/projects")
    .then((response) => response.json())
    .then((projects) => {
      projects.forEach((project) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${project.projectTitle} - ${project.projectDescription}`;

        // Create delete icon
        const deleteIcon = document.createElement("span");
        deleteIcon.textContent = "🗑️"; // Unicode trash can icon
        deleteIcon.style.cursor = "pointer";
        deleteIcon.style.marginLeft = "10px";
        deleteIcon.title = "Delete Project";

        // Add click event to delete the project
        deleteIcon.addEventListener("click", () => {
          if (
            confirm(
              `Are you sure you want to delete "${project.projectTitle}"?`
            )
          ) {
            fetch(`http://localhost:8080/projects/${project.id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  listItem.remove(); // Remove the project from the list
                  alert("Project deleted successfully.");
                } else {
                  alert("Failed to delete the project.");
                }
              })
              .catch((error) => {
                console.error("Error deleting project:", error);
                alert("An error occurred while deleting the project.");
              });
          }
        });

        // Create edit icon
        const editIcon = document.createElement("span");
        editIcon.textContent = "✏️"; // Unicode pencil icon
        editIcon.style.cursor = "pointer";
        editIcon.style.marginLeft = "10px";
        editIcon.title = "Edit Project";

        // Add click event to edit the project
        editIcon.addEventListener("click", () => {
          loadProjectIntoForm(project); // Load project data into the form
        });
        const viewSubBtn = document.createElement("span");
        viewSubBtn.textContent = "📁"; // eller "🔽" eller "Subprojects"
        viewSubBtn.style.cursor = "pointer";
        viewSubBtn.style.marginLeft = "10px";
        viewSubBtn.title = "View Subprojects";
        viewSubBtn.addEventListener("click", () => {
          localStorage.setItem("parentProjectId", project.id);
          location.href = "subproject-list.html";
        });

        listItem.appendChild(deleteIcon);
        listItem.appendChild(editIcon);
        listItem.appendChild(viewSubBtn);
        projectListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
});

