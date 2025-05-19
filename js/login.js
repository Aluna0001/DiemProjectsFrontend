document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const messageDiv = document.getElementById("loginMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageDiv.textContent = "";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Login successful! Redirecting...";
        localStorage.setItem("token", data.token || "");
        setTimeout(() => {
          window.location.href = "landingpage.html";
        }, 1000);
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = data.message || "Login failed.";
      }
    } catch (err) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "Network error.";
    }
  });
});
