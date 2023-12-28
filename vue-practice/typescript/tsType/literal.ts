const message: "Hello World" = "Hello World";

let num: 123 = 123;
num = 321;

let align: "left" | "right" | "center" = "left";
align = "right";
align = "center";

align = "height";

type Method = "GET" | "POST";

type Request = {
  url: string;
  method: Method;
};

function request(url: string, method: Method) {}

// const options: Request = {
//   url: "https://www.woodbell.org",
//   method: "POST",
// };
// const options = {
//   url: "https://www.woodbell.org",
//   method: "POST",
// };
const options = {
  url: "https://www.woodbell.org",
  method: "POST",
} as const;

// request(options.url, options.method);
request(options.url, options.method as Method);

export {};
