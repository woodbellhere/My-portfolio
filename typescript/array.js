"use strict";
let arr = [{ name: "张三", age: 30 }, { name: "李四" }];
let matrix = [[1], [2], [3]];
function arrAy(...args) {
    let a = arguments;
    console.log(args);
}
arrAy(1, 3, "d");
