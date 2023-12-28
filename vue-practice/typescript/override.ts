// type AddType = number | string;

function add(a1: number | string, a2: number | string) {
  if (typeof a1 === "number" && typeof a2 === "number") {
    return a1 + a2;
  } else if (typeof a1 === "string" && typeof a2 === "string") {
    return a1 + a2;
  }
}

add(10, 20);

// function add(num1: number, num2: number) {}
// function add(num1: number, num2: number, num3: number) {}

function addOver(num1: number, num2: number): number;
function addOver(num1: string, num2: string): string;

function addOver(num1: any, num2: any): any {
  return num1 + num2;
}

const result = addOver(20, 30);

function getLengthUnion(args: string | any[]) {
  return args.length;
}
console.log(getLengthUnion("abc"));
console.log(getLengthUnion([123, 321, 123]));

function getLengthOver(args: string): number;
function getLengthOver(args: any[]): number;

function getLengthOver(args: any): number {
  return args.length;
}
console.log(getLengthOver("abc"));
console.log(getLengthOver([123, 321, 231]));

export {};
