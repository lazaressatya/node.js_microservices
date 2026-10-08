const express = require("express");

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "user-service",
    status: "running"
  });
});

app.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Lazares"
    },
    {
      id: 2,
      name: "John"
    }
  ]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`User service running on port ${PORT}`);
});