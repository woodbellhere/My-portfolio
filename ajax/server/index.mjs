import express from "express";
import jwt from "jsonwebtoken";
const app = express();

let stuArr = [
  { id: "1", name: "woodbell", age: 18, gender: "male", address: "earth" },
  { id: "2", name: "wood", age: 28, gender: "male", address: "tela" },
  { id: "3", name: "bell", age: 38, gender: "male", address: "moon" },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

app.get("/test", (req, res) => {});

// 登录路由
app.use("/login", (req, res) => {
  // 获取用户提交的用户名和密码
  const { username, password } = req.body;
  // 验证用户名和密码
  if (username === "admin" && password === "123456") {
    // 成功登录则生成token
    const token = jwt.sign(
      {
        id: "12345",
        username: "admin",
        nickName: "超管",
        // 一般密钥放在configjs这种，引入就行
      },
      "woodbell",
      { expiresIn: "1h" }
    );
    // 并返回成功信息以及加密数据,可以适当传一些不敏感数据，客户端也能辅助读取
    res.send({
      status: "ok",
      data: { token },
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "wrong username or password",
    });
  }
});

// 必须在用户登录后才能访问
app.get("/students", (req, res) => {
  // 读取用户请求头是否登录，再给予访问权限
  // 因为authorization头加了bearer部分，还要简单处理字符串
  const token = req.get("Authorization").split(" ")[1];
  // 解密token
  try {
    const decodeToken = jwt.verify(token, "woodbell");
    res.send({
      status: "ok",
      data: stuArr,
    });
  } catch (error) {
    res.status(403).send({
      status: "error",
      data: "token invalid",
    });
  }
});
// 查询单个学生信息
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const targetStu = stuArr.find((item) => item.id === id);
  res.send({
    status: "ok",
    data: targetStu,
  });
});

app.post("/students", (req, res) => {
  console.log("post request got!");
  const { name, age, gender, address } = req.body;
  const stu = {
    id: +stuArr.at(-1).id + 1 + "",
    name,
    age: +age,
    gender,
    address,
  };
  stuArr.push(stu);
  res.send({
    status: "ok",
    data: stu,
  });
});

app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  const deleteTarget = stuArr.find((item) => item.id === id);
  if (deleteTarget) {
    stuArr = stuArr.filter((item) => item.id !== id);
    res.send({
      status: "ok",
      data: deleteTarget,
    });
  } else {
    res.status(403).send({
      status: "error",
      message: "Student not found with the provided id",
    });
  }
});

app.put("/students", (req, res) => {
  const { id, name, age, gender, address } = req.body;

  const updateStu = stuArr.find((item) => item.id === id);
  if (updateStu) {
    updateStu.name = name;
    updateStu.age = age;
    updateStu.gender = gender;
    updateStu.address = address;
    res.send({
      status: "ok",
      data: updateStu,
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "id dont exist",
    });
  }
});

app.listen(3000, () => {
  console.log("server is on!");
});
