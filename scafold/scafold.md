# 脚手架内容

## 自定义命令

- #! /usr/bin/env node
- 记得是 usr 不是 user
- 这个注释就是在使用自定义命令时让 node 执行这个文件

```json
 "bin": {
    "test-cli":"src/index.js"
  },
```

- 还要软链接一下,把命令挂载到全局

```sh
npm link

```

## 命令行交互的参数

## 能够下载模板
