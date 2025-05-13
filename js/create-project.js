document
  .getElementById("createProjectForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const project = {
      projectTitle: document.getElementById("projectTitle").value,
      projectDescription: document.getElementById("projectDescription").value,
      budget: parseFloat(document.getElementById("budget").value),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    };

    try {
      const response = await fetch("http://localhost:8080/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        alert("Project created successfully!");
        window.location.href = "../index.html"; // Redirect to the project list
      } else {
        alert("Failed to create project. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
