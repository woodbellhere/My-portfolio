import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
// fs也要传promise版本的
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 顺便用fs导入json
let studentArr = JSON.parse(
  await fs.readFile(path.resolve(__dirname, "./data/students.json"))
);

const app = express();
// 配置模板引擎
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "view"));
// 配置静态资源目录和body解析
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// 修改i需要跳转到一个表单页面。表单页面提交修改又要跳转到一个新路由
app.post("/update-student", (req, res) => {
  // 获取学生id
  const { id, name, age, gender, address } = req.body;
  const student = studentArr.find((item) => item.id === id);
  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.address = address;

  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(studentArr)
  )
    .then(() => {
      res.redirect("/students"); //面向app.post开头的路径切换}
    })
    .catch(() => {});
});
app.get("/to-update", (req, res) => {
  const id = +req.query.id;
  // 获取要修改的学生的信息
  const student = studentArr.find((item) => item.id === id);
  res.render("update", { student });
});
app.get("/delete", (req, res) => {
  app.get("/hello", (req, res) => res.send("hello"));
  // 获取要删除的学生的id
  const id = +req.query.id;
  // 根据id删除学生
  studentArr = studentArr.filter((stu) => stu.id !== id);
  // 将新的数组写入到文件中
  // 将新的数据写入到json文件中
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(studentArr)
  )
    .then(() => {
      res.redirect("/students");
    })
    .catch(() => {});
});
app.get("/students", (req, res) => {
  res.render("students", { studentArr });
});
app.post("/add-student", (req, res) => {
  // 生成一个id
  const id = studentArr.at(-1) ? studentArr.at(-1).id + 1 : 1;
  // 1.获取用户填写的信息
  const newUser = {
    id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    address: req.body.address,
  };
  // 2. 验证用户信息（略）

  // 3. 将用户信息添加到数组中
  studentArr.push(newUser);

  // 4. 返回响应
  // res.send("添加成功！")
  // 直接在添加路由中渲染ejs，会面临表单重复提交的问题
  // res.render("students", { stus: STUDENT_ARR })
  // 将新的数据写入到json文件中
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(studentArr)
  )
    .then(() => {
      // res.redirect() 用来发起请求重定向
      // 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students"); //面向app.post开头的路径切换}
    })
    .catch(() => {});
});

// 可以在所有路由的后边配置错误路由
app.use((req, res) => {
  // 只要这个中间件一执行，说明上边的地址都没有匹配
  res.status(404);
  res.send("<h1>您访问的地址已被外星人劫持！</h1>");
});

app.listen(3000, () => {
  console.log("服务器已经启动！");
});
