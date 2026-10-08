const express = require("express");

const app = express();

const PORT = 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "order-service",
    status: "running"
  });
});

app.get("/orders", (req, res) => {
  res.json([
    {
      id: 101,
      product: "Laptop",
      quantity: 1
    },
    {
      id: 102,
      product: "Mobile",
      quantity: 2
    }
  ]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Order service running on port ${PORT}`);
});