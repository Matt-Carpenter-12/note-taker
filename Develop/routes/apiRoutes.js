const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to read and write to the db.json file
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, "db.json"),
    JSON.stringify(notes, null, 2)
  );
};

// GET /api/notes - Read all notes
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST /api/notes - Add a new note
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: "Title and text are required" });
  }

  const newNote = { id: uuidv4(), title, text };
  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
