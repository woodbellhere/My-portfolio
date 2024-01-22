import zlib from "node:zlib";
import fs, { read } from "node:fs";
import http from "node:http";
// gzip 压缩
// const readStream = fs.createReadStream("file.txt");
// const writeStream = fs.createWriteStream("file.txt.gz");
// readStream.pipe(zlib.createGzip()).pipe(writeStream);

// gzip 解压
// const readStream = fs.createReadStream("file.txt.gz");
// const writeStream = fs.createWriteStream("file2.txt");
// readStream.pipe(zlib.createGunzip()).pipe(writeStream);

// deflate 压缩
// const readStream = fs.createReadStream("file.txt");
// const writeStream = fs.createWriteStream("file.txt.deflate");
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);

// deflate 解压
// const readStream = fs.createReadStream("file.txt.deflate");
// const writeStream = fs.createWriteStream("file3.txt");
// readStream.pipe(zlib.createInflate()).pipe(writeStream);

const server = http.createServer((req, res) => {
  const txt = "woodbell".repeat(1000);
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-type", "text/plain;charset=utf-8");
  let result = zlib.gzipSync(txt);
  res.end(result);
});

server.listen(3000, () => {
  "server is on!";
});
