import jwt from "jsonwebtoken";

const obj = {
  name: "swk",
  age: 18,
  gender: "male",
};
// 加密部分
const token = jwt.sign(obj, "woodbell", { expiresIn: "1h" });
console.log(token);

try {
  // 服务器收到token解密部分
  const decodeData = jwt.verify(token, "woodbell");
  console.log(decodeData);
} catch (error) {
  console.log("invalid token");
}
