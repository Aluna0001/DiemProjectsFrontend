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

function loadProjectIntoForm(subproject) {
    // Save project data to localStorage to pass it to the create-project page
    localStorage.setItem("editSubProject", JSON.stringify(subproject));
    location.href = "create-subproject.html"; // Redirect to the create-project page
}

document.addEventListener("DOMContentLoaded", () => {
    const subprojectListContainer = document.getElementById(
        "subproject-list-container"
    );

    // Fetch projects from the backend
    fetch("http://localhost:8080/subprojects")
        .then((response) => response.json())
        .then((subprojects) => {
            subprojects.forEach((subproject) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${subproject.subProjectTitle} - ${subproject.subProjectDescription}`;

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
                            `Are you sure you want to delete "${subproject.subprojectTitle}"?`
                        )
                    ) {
                        fetch(`http://localhost:8080/subprojects/${subproject.id}`, {
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
                    loadProjectIntoForm(subproject); // Load project data into the form
                });

                listItem.appendChild(deleteIcon);
                listItem.appendChild(editIcon);
                subprojectListContainer.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching projects:", error);
        });
});
