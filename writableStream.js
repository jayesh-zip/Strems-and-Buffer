// import fs from 'fs';
// import express from 'express';

// const PORT = 3000;
// const app = express();

// app.get("/", (req, res) => {
//   const readStream = fs.createReadStream("./largefile.txt", "utf-8");
//   const writeStream = fs.createWriteStream("./output.txt", "utf-8");

//   readStream.pipe(writeStream);

//   writeStream.on("finish", () => {
//     res.send("File copied to output.txt successfully.");
//     console.log("Copy complete.");
//   });

//   writeStream.on("error", (err) => {
//     console.error("Write error:", err);
//     res.status(500).send("Write failed.");
//   });

//   readStream.on("error", (err) => {
//     console.error("Read error:", err);
//     res.status(500).send("Read failed.");
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



import fs from 'fs';
import zlib from 'zlib';
import express from 'express';

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  const readStream = fs.createReadStream("./largefile.txt", "utf-8");
  const zipStream = zlib.createGzip(); // Compress stream
  const writeStream = fs.createWriteStream("./output.zip"); // Target file

  // Pipe: read → gzip → write
  readStream.pipe(zipStream).pipe(writeStream);

  writeStream.on("finish", () => {
    res.send("File compressed and saved as output.zip successfully.");
    console.log("Compression complete.");
  });

  writeStream.on("error", (err) => {
    console.error("Write error:", err);
    res.status(500).send("Write failed.");
  });

  readStream.on("error", (err) => {
    console.error("Read error:", err);
    res.status(500).send("Read failed.");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
