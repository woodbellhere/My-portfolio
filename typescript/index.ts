// let str: string = "xiaoman";
// let num: number = 123;
// let strNum: string = `${num}`;
// console.log(str);

// let notANumber: number = NaN;
// let num2: number = 231;
// let infinityNumber: number = Infinity;
// let decimal: number = 6;
// let hex: number = 0xf00d;
// let binary: number = 0b1010;
// let octal: number = 0o744;

// let bool: boolean = true;
// let bool2: boolean = false;
// let n: null = null;
// let what: undefined = undefined;
// let noExist: void;

// function myFn(): void {}

let a: number = 999;
console.log(a);

let any: any = 1;

any = "hello";
any = false;
any = [];
any = {};
any = Symbol("1");

let xiaoman: unknown = { handsome: true, open: () => 1234 };
console.log(xiaoman.open());
