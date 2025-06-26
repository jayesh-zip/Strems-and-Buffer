import express from "express";
import fs from "fs";
import statusMonitor from "express-status-monitor";

const PORT = 3000;
const app = express();

// Use the status monitor middleware
app.use(statusMonitor());

app.get("/", (req, res) => {
  const readStream = fs.createReadStream("./largefile.txt", "utf-8");

  // Handle data chunks
  readStream.on("data", (chunk) => {
    res.write(chunk);
    console.log(`Received ${chunk.length} bytes`);
  });

  // End the response when streaming is done
  readStream.on("end", () => {
    res.end();
    console.log("Streaming finished.");
  });

  // Handle errors
  readStream.on("error", (err) => {
    console.error("Error reading file:", err);
    res.status(500).send("Error reading the file.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
