import express from "express";
import fs from "fs/promises";
import path from "path";
const router = express.Router();
let studentArr = JSON.parse(
  await fs.readFile(path.resolve(__dirname, "./data/students.json"))
);

// 入口的权限检查中间件，省事
router.use((req, res, next) => {
  if (req.session.loginUser) {
    next();
  } else {
    res.redirect("/");
  }
});

// cookie登录权限
// router.get("/list", (req, res) => {
//   if (req.cookies.username) {
//     res.render("students", { studentArr });
//   } else {
//     res.redirect("/");
//   }
// });

// session登录权限
router.get("/list", (req, res) => {
  // if (req.session.loginUser) {
  //   res.render("students", { studentArr });
  // } else {
  //   res.redirect("/");
  // }
  res.render("student", { studentArr, username: req.session.loginUser });
});

router.post("/add", (req, res, next) => {
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
  // 并传入下一个路由
  next();
});

router.get("/delete", (req, res, next) => {
  // 获取要删除的学生的id
  const id = +req.query.id;
  // 根据id删除学生
  studentArr = studentArr.filter((stu) => stu.id !== id);
  next();
});

router.post("/update-student", (req, res, next) => {
  // 获取学生id
  const { id, name, age, gender, address } = req.body;
  const student = studentArr.find((item) => item.id === id);
  student.name = name;
  student.age = +age;
  student.gender = gender;
  student.address = address;
  next();
});

router.get("/to-update", (req, res) => {
  const id = +req.query.id;
  // 获取要修改的学生的信息
  const student = studentArr.find((item) => item.id === id);
  res.render("update", { student });
});

router.use((req, res) => {
  // 4. 返回响应
  // res.send("添加成功！")
  // 直接在添加路由中渲染ejs，会面临表单重复提交的问题
  // 将新的数据写入到json文件中
  fs.writeFile(
    path.resolve(__dirname, "../data/students.json"),
    JSON.stringify(studentArr)
  )
    .then(() => {
      // res.redirect() 用来发起请求重定向
      // 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students/list"); //面向app.post开头的路径切换}
    })
    .catch(() => {});
});

export default router;
