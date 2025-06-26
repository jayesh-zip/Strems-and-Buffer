import cluster from "cluster";
import { cpus } from "os";
import express from "express";
import process from "process";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died → Restarting`);
    cluster.fork();
  });
} else {
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  app.use((req, res) => {
    res.status(404).send("Not Found");
  });

  const server = app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });
}
