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

        // Create a container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "action-buttons";

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-button";
        deleteButton.title = "Delete Project";

        // Add click event to delete the project
        deleteButton.addEventListener("click", () => {
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

        // Create edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-button";
        editButton.title = "Edit Project";

        // Add click event to edit the project
        editButton.addEventListener("click", () => {
          loadProjectIntoForm(project); // Load project data into the form
        });

        // Create "go to subproject" button
        const subprojectButton = document.createElement("button");
        subprojectButton.textContent = "Go to Subprojects";
        subprojectButton.className = "action-button";
        subprojectButton.title = "View Subprojects";

        // Add click event to navigate to subprojects
        subprojectButton.addEventListener("click", () => {
          localStorage.setItem("parentProjectId", project.id);
          localStorage.setItem("parentProjectName", project.projectTitle); //DENNE LINJE ER VIGTIG til at hente navnet på project til subproject
          location.href = "subproject-list.html";
        });

        // Append buttons to the button container
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(subprojectButton);

        // Append the button container to the list item
        listItem.appendChild(buttonContainer);
        projectListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
});
