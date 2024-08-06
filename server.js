const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./Develop/routes/apiRoutes")
const htmlRoutes = require("./Develop/routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// // Helper function to send HTML files
// function sendHtmlFile(res, filePath) {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.setHeader("Content-Type", "text/html");
//       res.send(data);
//     }
//   });
// }

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", apiRoutes)
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
