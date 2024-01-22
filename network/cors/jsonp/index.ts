import express from "express";

const app = express();

app.get("/api/jsonp", (req, res) => {
  const { callback } = req.query;
  res.send(`${callback}('hello jsonp')`);
});

app.listen(3000, () => {
  console.log("server is on!");
});
