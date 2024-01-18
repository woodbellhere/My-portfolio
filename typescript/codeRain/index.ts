let canvas: HTMLCanvasElement = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = screen.availWidth;
canvas.height = screen.availHeight;

let str: string[] = "woodbell".split("");
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0);

const rain = () => {
  ctx?.fillStyle = `rgba(0,0,0,0.05)`;
  ctx?.fillRect(0, 0, canvas.width, canvas.height);
  ctx?.fillStyle = "blue";
  Arr.forEach((item, index) => {
    ctx?.fillText(
      str[Math.floor(Math.random() * str.length)],
      index * 10,
      item + 10 + 10
    );
  });
};
