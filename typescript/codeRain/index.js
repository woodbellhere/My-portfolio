let canvas = document.querySelector("canvas");
// 获取canvas元素
let ctx = canvas.getContext("2d");
// 获取canvas的2D绘图上下文
canvas.width = screen.availWidth;
// 设置canvas的宽度为屏幕可用宽度
canvas.height = screen.availHeight;
// 设置canvas的高度为屏幕可用高度
let str = "WOODBELLWOOD".split("");
// 将字符串"WOODBELLWOOD"按空格分割，存入str数组
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0);
// 创建一个长度为canvas宽度/10的数组，元素值为0
console.log(Arr);
// 打印Arr数组
let rain = function () {
  // 定义rain函数
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  // 设置填充颜色
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 绘制矩形，参数为canvas的宽度，高度
  ctx.fillStyle = "#0f0";
  // 设置填充颜色
  Arr.forEach(function (item, index) {
    // 遍历Arr数组
    ctx.fillText(
      str[Math.floor(Math.random() * str.length)],
      index * 10,
      item + 10 + 10
    );
    // 获取str数组中随机一个元素，设置填充文本，参数为index*10，item+10+10
    Arr[index] =
      item > canvas.height || item > 8000 * Math.random() ? 0 : item + 10;
    // 判断item是否大于canvas的高度或者item是否大于8000*Math.random()，如果大于，则将Arr数组中对应index的元素设置为0，否则设置为item+10
  });
  // 结束遍历Arr数组
};

setInterval(rain, 40);
