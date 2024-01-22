import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let user = {
  name: "admin",
  password: "admin",
  id: 1,
};

let privateKey = "woodbell";

// 登录返回前端token用于授权
app.post("/api/login", (req, res) => {
  if (req.body.name === user.name && req.body.password === user.password) {
    res.json({
      message: "login success",
      token: jwt.sign({ id: user.id }, privateKey, { expiresIn: "1h" }),
    });
  } else {
    res.status(403).json("用户名或密码错误");
  }
});
// 列表接口需是授权状态才能访问，不然返回403
app.get("/api/list", (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.status(403).json("token验证失败");
    } else {
      res.json({
        message: "list success",
        list: [
          { id: 1, name: "woodbell" },
          { id: 2, name: "wood" },
        ],
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
