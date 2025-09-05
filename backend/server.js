const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const USERS_FILE = "./users.json";

app.use(cors());
app.use(bodyParser.json());

// helper to read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// helper to save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Registration
app.post("/register", (req, res) => {
  const { username, password, age, gender, citizenship } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  let users = getUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password, age, gender, citizenship });
  saveUsers(users);
  res.json({ message: "Registration successful" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", user });
});

// Admin get all users
app.get("/admin/users", (req, res) => {
  let users = getUsers();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
