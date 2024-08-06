const router = require("express").Router()
const path = require("path");

// Define route for /notes
router.get("/notes", (req, res) => {
  const notesPath = path.join(__dirname, "../public/notes.html");
  res.sendFile(notesPath);
});

// Define catch-all route for all other routes
router.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../public/index.html");
  res.sendFile(indexPath);
});

module.exports = router