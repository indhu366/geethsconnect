
const studentRegisterForm = document.getElementById("studentRegisterForm");

if (studentRegisterForm) {
  studentRegisterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const cpassword = document.getElementById("regConfirmPassword").value.trim();

    if (!name || !email || !password || !cpassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("studentId", data.studentId);
        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (err) {
      alert("Server error! Try again later.");
      console.error(err);
    }
  });
}
