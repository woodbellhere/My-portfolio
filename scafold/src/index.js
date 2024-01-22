#! /usr/bin/env node
import fs from "node:fs";
import { program } from "commander";
import inquirer from "inquirer";

import { checkPath, downloadTemplate } from "./util.js";
// console.log("test");

// 获取package.json文件
let json = fs.readFileSync("./package.json");
json = JSON.parse(json);

// 版本就直接读取package.json中的版本 使用时 参数加 V
program.version(json.version);

program
  .command("create <programName>")
  .alias("c")
  .description("创建项目")
  .action((projectName) => {
    // console.log(projectName);
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称",
          default: projectName,
        },
        {
          type: "confirm",
          name: "isTs",
          message: "是否使用ts模板?",
        },
      ])
      .then((res) => {
        if (checkPath(res.projectName)) {
          console.log("file exist");
          return true;
        }
        if (res.isTs) {
          downloadTemplate("ts", res.projectName);
        } else {
          downloadTemplate("js", res.projectName);
        }
        console.log(res);
      });
  });

program.parse(process.argv);
