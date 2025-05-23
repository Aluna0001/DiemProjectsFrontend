function updateSubProject(id, updatedData) {
  fetch(`http://localhost:8080/subprojects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.ok) {
        alert("SubProject updated successfully.");
        location.href = "subproject-list.html"; // Redirect back to the project list
      } else {
        alert("Failed to update the subproject.");
      }
    })
    .catch((error) => {
      console.error("Error updating subproject:", error);
      alert("An error occurred while updating the subproject.");
    });
}
/*
function loadProjectIntoForm(subproject) {
  // Save project data to localStorage to pass it to the create-project page
  localStorage.setItem("editSubproject", JSON.stringify(subproject));
  location.href = "create-subproject.html"; // Redirect to the create-project page
}
*/
document.addEventListener("DOMContentLoaded", () => {
  // Hent <h1> elementet
  const heading = document.getElementById("projectTitle");

  // Hent projektnavn fra localStorage
  const projectName = localStorage.getItem("parentProjectName");

  // Opdater teksten hvis navnet findes
  if (projectName) {
    heading.textContent = `All SubProjects for ${projectName}`;
  } else {
    heading.textContent = "All SubProjects";
  }

  const subprojectListContainer = document.getElementById(
    "subproject-list-container"
  );

  // Fetch subprojects from the backend
  fetch("http://localhost:8080/subprojects")
    .then((response) => response.json())
    .then((subprojects) => {
      subprojects.forEach((subproject) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${subproject.subProjectTitle} - ${subproject.subProjectDescription}`;

        // Create a container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "action-buttons";

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-button";
        deleteButton.title = "Delete Subproject";

        // Add click event to delete the subproject
        deleteButton.addEventListener("click", () => {
          if (
            confirm(
              `Are you sure you want to delete "${subproject.subprojectTitle}"?`
            )
          ) {
            fetch(`http://localhost:8080/subprojects/${subproject.id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  listItem.remove(); // Remove the subproject from the list
                  alert("Subproject deleted successfully.");
                } else {
                  alert("Failed to delete the subproject.");
                }
              })
              .catch((error) => {
                console.error("Error deleting subproject:", error);
                alert("An error occurred while deleting the subproject.");
              });
          }
        });

        // Create edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-button";
        editButton.title = "Edit Subproject";

        // Add click event to edit the subproject
        editButton.addEventListener("click", () => {
          localStorage.setItem("editSubproject", JSON.stringify(subproject));
          location.href = "create-subproject.html"; // Redirect to edit subproject page
        });

        // Create a button to access tasks
        const taskButton = document.createElement("button");
        taskButton.textContent = "View Tasks";
        taskButton.className = "action-button";
        taskButton.title = "View Tasks for Subproject";

        // Add click event to navigate to tasks
        taskButton.addEventListener("click", () => {
          localStorage.setItem("subProjectId", subproject.id);
          localStorage.setItem("subProjectName", subproject.subProjectTitle);

          location.href = "task-list.html"; // Redirect to task list page
        });

        // Append buttons to the button container
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(taskButton);

        // Append the button container to the list item
        listItem.appendChild(buttonContainer);
        subprojectListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching subprojects:", error);
    });

  //til create subproject
  document.getElementById("createNewSubprojectBtn").addEventListener("click", () => {
    localStorage.removeItem("editSubproject"); // Slet editSubproject data
    location.href = "create-subproject.html"; // Gå til opret siden
  });

});
