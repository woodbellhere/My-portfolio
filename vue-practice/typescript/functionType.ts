function foo() {}

type FooFnType = () => void;

function bar(fn: FooFnType) {
  fn();
}

bar(foo);

type AddFnType = (num1: number, num2: number) => void;
const add: AddFnType = (num1: number, num2: number) => {
  return num1 + num2;
};

function calc(
  n1: number,
  n2: number,
  fn: (num1: number, num2: number) => number
) {
  return fn(n1, n2);
}

const result1 = calc(20, 30, function (a1, a2) {
  return a1 + a2;
});
console.log(result1);

const result2 = calc(20, 30, function (a1, a2) {
  return a1 * a2;
});
console.log(result2);

export {};
