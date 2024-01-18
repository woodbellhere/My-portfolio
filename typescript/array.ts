interface Sequence {
  name: string;
  age?: number;
}

let arr: Sequence[] = [{ name: "张三", age: 30 }, { name: "李四" }];

let matrix: number[][] = [[1], [2], [3]];

function arrAy(...args: string[]) {
  let a: IArguments = arguments;
  console.log(args);
}

arrAy(1, 3, "d");
