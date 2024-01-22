import express from "express";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/api/post", (req, res) => {
  console.log(req.body.name);
  res.json({
    code: 200,
  });
});

app.post("/api/upload", upload.single("file"), (req, res) => (req, res) => {
  console.log(req.file);
  res.json({
    code: 200,
  });
});
