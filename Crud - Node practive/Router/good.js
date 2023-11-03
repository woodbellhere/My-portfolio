import express from "express";

// 创建router对象
const router = express.Router();

router.get("/list", (req, res) => {
  res.send("hello 我是hello路由");
});

// 将router暴露到模块外
export default router;
