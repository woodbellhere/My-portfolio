import "./style/index.css";
import bread from "./asset/bread-800.jpg";
document.body.insertAdjacentHTML("beforeend", "<h1>what a great day,222</h1>");
document.body.insertAdjacentHTML("beforeend", `<img src="${bread}" />`);

const a = 10;
console.log(a);
const fn = () => {
  return "haha";
};
console.log(fn());

document.body.addEventListener("click", () => {
  alert("why click me ?");
});
