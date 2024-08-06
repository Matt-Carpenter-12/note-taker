const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

// Helper function to read and write to the db.json file
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  console.log(notes);
  try {
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
};

// GET /api/notes - Read all notes
router.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST /api/notes - Add a new note
router.post("/notes", (req, res) => {
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

module.exports = router;
