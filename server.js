require("dotenv").config();

const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "coursepath_db",
  waitForConnections: true,
  connectionLimit: 5,
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      success: true,
      database: "connected",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      database: "disconnected",
      error: err.message,
    });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM courses ORDER BY course_code",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    await pool.execute(
      "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
    );

    res.json({
      success: true,
      message: "Feedback saved successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CoursePath running at http://localhost:${PORT}`);
});
