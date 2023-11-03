import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
FileStore(session);
// fs也要传promise版本的
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// 配置模板引擎
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "view"));
// 配置静态资源目录和body解析
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: new FileStore({
      path: path.resolve(__dirname, "./sessions"),
      secret: "hello",
      // ttl:10 session重启时间
    }),
    secret: "hello",
  })
);

// 设置和“删除”cookie的方式
// app.get("set", (req, res) => {
//   res.cookie("name", "woodbell", {
//     maxAge: 1000 * 60 * 60,
//   });
//   res.send("cookie set");
// });

// app.get("/delete-cookie", (req, res) => {
//   res.cookie("name", "", {
//     maxAge: 0,
//   });
//   res.send("cookie delete");
// });

// app.get("/get", (req, res) => {
//   const name = req.cookies.name;
// });

// 设置和检验cookie
// app.get("/get-cookie", (req, res) => {
//   res.cookie("username", "admin");
//   res.send("cookie has emitted");
// });

// app.get("/hello", (req, res) => {
//   console.log(req.cookies);
//   res.send("cookie get");
// });

app.use("/student", import("./Router/student"));

app.get("/", (req, res) => {
  res.render("login");
});

// 设置和使用session，注意，信息在req上
// app.set("/set", (req, res) => {
//   req.session.username = "woodbell";
//   res.send("session check");
// });

// app.get("/get", (req, res) => {
//   const username = req.session.username;
//   console.log(username);
//   res.send("session got");
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123456") {
    // 登录成功后将用户信息放入session,开发中会存对象
    // 这里的session还是存在内存里，但同时的操作会去读磁盘里的session，需要手动马上存储
    req.session.loginUser = username;
    req.session.save(() => {
      // res.cookie("username", username);
      res.redirect("/student/list");
    });
  } else res.send("login failed");
});

app.get("/logout", (req, res) => {
  // 同时要让session失效
  req.session.destroy(() => {
    res.redirect("/");
  });
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
