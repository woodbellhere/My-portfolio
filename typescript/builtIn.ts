let num: Number = new Number(1);
let date: Date = new Date();
let reg: RegExp = new RegExp("\\w+");
let error: Error = new Error("Error occurred");
let xhr: XMLHttpRequest;

let div = document.querySelector("input");
let div2: NodeListOf<HTMLElement | HTMLDivElement> =
  document.querySelectorAll("div");

let local: Storage = localStorage;
let loc: Location = location;
let promise: Promise<void> = new Promise((resolve, reject) => {});
