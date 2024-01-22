import fs from "node:fs";
import download from "download-git-repo";
import ora from "ora";
const spinner = ora("正在下载");
export const checkPath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

export const downloadTemplate = (branch, projectName) => {
  return new Promise((resolve, reject) => {
    spinner.start();
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      projectName,
      {
        clone: true,
      },
      function (err) {
        if (err) reject();
        resolve();
        spinner.succeed("下载完成");
      }
    );
  });
};
