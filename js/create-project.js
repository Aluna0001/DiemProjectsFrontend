document.addEventListener("DOMContentLoaded", () => {
  const projectForm = document.getElementById("createProjectForm");
  const submitButton = document.querySelector("#createProjectForm button");

  // Check if there's project data in localStorage
  const editProjectData = localStorage.getItem("editProject");
  if (editProjectData) {
    const project = JSON.parse(editProjectData);

    // Populate the form with the project data
    document.getElementById("projectTitle").value = project.projectTitle;
    document.getElementById("projectDescription").value =
      project.projectDescription;
    document.getElementById("budget").value = project.budget;
    document.getElementById("startDate").value = project.startDate;
    document.getElementById("endDate").value = project.endDate;

    // Change button text to "Update Project"
    submitButton.textContent = "Update Project";

    // Update the form's submit event to handle editing
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      const updatedProject = {
        projectTitle: document.getElementById("projectTitle").value,
        projectDescription: document.getElementById("projectDescription").value,
        budget: document.getElementById("budget").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
      };

      // Call the updateProject function
      fetch(`http://localhost:8080/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      })
        .then((response) => {
          if (response.ok) {
            alert("Project updated successfully.");
            location.href = "project-list.html"; // Redirect to project list
          } else {
            alert("Failed to update the project.");
          }
        })
        .catch((error) => {
          console.error("Error updating project:", error);
          alert("An error occurred while updating the project.");
        });

      // Clear localStorage after editing
      localStorage.removeItem("editProject");
    });
  } else {
    // Handle creating a new project
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      const newProject = {
        projectTitle: document.getElementById("projectTitle").value,
        projectDescription: document.getElementById("projectDescription").value,
        budget: document.getElementById("budget").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
      };

      // Send POST request to create a new project
      fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })
        .then((response) => {
          if (response.ok) {
            alert("Project created successfully.");
            location.href = "project-list.html"; // Redirect to project list
          } else {
            alert("Failed to create the project.");
          }
        })
        .catch((error) => {
          console.error("Error creating project:", error);
          alert("An error occurred while creating the project.");
        });
    });
  }
});
