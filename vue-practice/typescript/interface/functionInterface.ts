type CalcFn = (n1: number, n2: number) => number;

function calc(
  num1: number,
  num2: number,
  // calcFn: (n1: number, n2: number) => number
  calcFn: CalcFn
) {
  return calcFn(num1, num2);
}

const add: CalcFn = (num1, num2) => {
  return num1 + num2;
};
