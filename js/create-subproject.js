document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createSubprojectForm");
    const parentProjectId = localStorage.getItem("parentProjectId");
    const editSubprojectData = localStorage.getItem("editSubproject");

    if (!parentProjectId) {
        alert("No parent project selected.");
        window.location.href = "project-list.html";
        return;
    }

    if (editSubprojectData) {
        const subproject = JSON.parse(editSubprojectData);
        document.getElementById("formTitle").textContent = "Edit Subproject";

        // Forudfyld formularfelterne
        document.getElementById("subprojectTitle").value = subproject.subProjectTitle;
        document.getElementById("subprojectDescription").value = subproject.subProjectDescription;

        // Opdater subprojekt (PUT)
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const updatedSubproject = {
                subProjectTitle: document.getElementById("subprojectTitle").value,
                subProjectDescription: document.getElementById("subprojectDescription").value,
            };

            fetch(`http://localhost:8080/subprojects/${subproject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedSubproject),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Subproject updated successfully.");
                        localStorage.removeItem("editSubproject");
                        window.location.href = "subproject-list.html";
                    } else {
                        alert("Failed to update subproject.");
                    }
                })
                .catch((error) => {
                    console.error("Error updating subproject:", error);
                });
        });
    } else {
        // Opret nyt subprojekt (POST)
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newSubproject = {
                subProjectTitle: document.getElementById("subprojectTitle").value,
                subProjectDescription: document.getElementById("subprojectDescription").value,
            };

            fetch(`http://localhost:8080/projects/${parentProjectId}/subprojects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSubproject),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Subproject created successfully.");
                        window.location.href = "subproject-list.html";
                    } else {
                        alert("Failed to create subproject.");
                    }
                })
                .catch((error) => {
                    console.error("Error creating subproject:", error);
                });
        });
    }
});
