function foo() {
  return;
}

function bar() {
  return 123;
}

let flag = true;
let result: unknown;
if (flag) {
  result = foo();
} else {
  result = bar();
}
