import express from "express";

const router = express.Router();
// route是一个能够绑其他中间件和路由的中间件
// 和express不是一个对象，所以可以放入不同文件
router.get("/list", (req, res) => res.send("hello  i am list"));

export default router;
