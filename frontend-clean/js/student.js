// backend/routes/student.js
const express = require("express");
const router = express.Router();

// -----------------------------
// In-memory storage for demo
// -----------------------------
let students = [];   // {id, name, email, password}
let feedbacks = [];  // {id, studentId, event, rating, message, createdAt}

// -----------------------------
// STUDENT REGISTRATION
// -----------------------------
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  const existing = students.find((s) => s.email === email);
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    password,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Registration successful",
    studentId: newStudent.id,
    name: newStudent.name,
  });
});

// -----------------------------
// STUDENT LOGIN
// -----------------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const student = students.find(
    (s) => s.email === email && s.password === password
  );

  if (!student) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    studentId: student.id,
    name: student.name,
  });
});

// -----------------------------
// SUBMIT FEEDBACK
// -----------------------------
router.post("/feedback", (req, res) => {
  let { studentId, event, rating, message } = req.body;

  if (!studentId || !event || !rating || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ✅ Fix: Convert studentId to number
  const sid = parseInt(studentId);
  if (isNaN(sid)) {
    return res.status(400).json({ message: "Invalid studentId" });
  }

  // Optional: rating number
  const r = parseInt(rating);

  const student = students.find((s) => s.id === sid);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const newFeedback = {
    id: feedbacks.length + 1,
    studentId: sid,
    studentName: student.name, // helpful for admin
    event,
    rating: r,
    message,
    createdAt: new Date(),
  };

  feedbacks.push(newFeedback);

  res.status(201).json({
    message: "Feedback submitted successfully",
    feedback: newFeedback,
  });
});

// -----------------------------
// GET ALL FEEDBACKS (Admin)
// -----------------------------
router.get("/feedbacks", (req, res) => {
  res.json(feedbacks);
});

module.exports = router;
