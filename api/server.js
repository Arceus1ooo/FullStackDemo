const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json()); // enables express to parse json
app.use(express.static(path.join(__dirname, "../ui"))); // expose front-end resources to the browser

// Routes
app.use("/api/clients", require("./routes/client-routes"));
app.use("/api/interactions", require("./routes/interaction-routes"));

// Serve the web page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../ui", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
