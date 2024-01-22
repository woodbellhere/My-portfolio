import ws from "ws";

const wss = new ws.Server({ port: 8080 }, () => {
  console.log("ws is on !");
});

const state = {
  HEART: 1,
  MESSAGE: 2,
};

wss.on("connection", (socket) => {
  console.log("client is on!");
  socket.on("message", (e) => {
    console.log(e.toString());
    // 实现广播群发
    wss.clients.forEach((client) => {
      // client.send("这是服务端发给客户端的消息" + e.toString());
      client.send(
        JSON.stringify({ type: state.MESSAGE, message: e.toString() })
      );
    });
    // socket.send("这是服务端发给客户端的消息" + e.toString());
  });

  let heartInterval = null;
  const heartCheck = () => {
    // ws open时才会开启心跳检测
    if (socket.readyState === ws.OPEN) {
      socket.send(JSON.stringify({ type: state.HEART, message: "heartCheck" }));
    } else {
      clearInterval(heartInterval);
    }
  };
  setInterval(heartCheck, 5000);
});
