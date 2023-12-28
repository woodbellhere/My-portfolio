function foo() {
  while (true) {
    console.log("123");
  }
}

function loopErr(): never {
  throw new Error();
}
