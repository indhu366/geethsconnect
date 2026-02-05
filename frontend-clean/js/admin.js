const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const pass = document.getElementById("adminPassword").value.trim();

    // Demo admin credentials
    if (email === "admin@gmail.com" && pass === "admin123") {
      alert("✅ Admin Login Successful!");
      window.location.href = "admindashboard.html";
    } else {
      alert("❌ Invalid Admin Credentials!\nTry: admin@gmail.com / admin123");
    }
  });
}
