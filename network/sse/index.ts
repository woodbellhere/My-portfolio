app.get("/api/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
  });
  const txt = fs.readFileSync("./data.txt", "utf8");
  const arr = txt.split("\n");
  let current = 0;
  let timer = setInterval(() => {
    if (current < arr.length) {
      res.write(`data: ${arr[current]}\n\n`);
      current++;
    } else {
      clearInterval(timer);
    }
  }, 300);
});
