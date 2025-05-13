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
        projectListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
});
