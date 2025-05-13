document.addEventListener("DOMContentLoaded", async () => {
  const projectList = document.getElementById("projectList");

  try {
    const response = await fetch("http://localhost:8080/projects");
    const projects = await response.json();

    projects.forEach((project) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${project.projectTitle} - ${project.projectDescription}`;
      projectList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    projectList.textContent = "Failed to load projects.";
  }
});
