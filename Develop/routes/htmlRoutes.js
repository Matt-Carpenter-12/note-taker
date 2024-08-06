const router = require("express").Router()


// Define route for /notes
router.get("/notes", (req, res) => {
  const notesPath = path.join(__dirname, "Develop/public/notes.html");
  sendHtmlFile(res, notesPath);
});

// Define catch-all route for all other routes
router.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "Develop/public/index.html");
  sendHtmlFile(res, indexPath);
});
