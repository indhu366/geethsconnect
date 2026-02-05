const studentLoginForm = document.getElementById("studentLoginForm");

if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("studentId", data.studentId);
        localStorage.setItem("studentName", data.name);
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (err) {
      alert("Server error! Try again later.");
      console.error(err);
    }
  });
}
