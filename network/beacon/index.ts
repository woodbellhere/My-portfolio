import express from "express";

const app = express();

app.post("/api/b", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
