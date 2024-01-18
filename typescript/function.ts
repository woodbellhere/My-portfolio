function add(a: number, b: number) {
  return a + b;
}

console.log(add(1, 2));

const add2 = (a: number = 30, b: number = 50): number => a + b;

console.log(add2());

interface User {
  name: string;
  age: number;
}

function add3(user: User): User {
  return user;
}

console.log(add3({ name: "John", age: 30 }));

interface Obj {
  user: number[];
  add: (this: Obj, num: number) => void;
}

let objfn: Obj = {
  user: [1, 2, 3],
  add(this: Obj, num: number) {
    this.user.push(num);
  },
};

objfn.add(4);

console.log(objfn);

let user: number[] = [1, 2, 3];
function findNum(id: number): number[];
function findNum(add: number[]): number[];
function findNum(): number[];
function findNum(ids?: number | number[]): number[] {
  if (typeof ids === "number") {
    return user.filter((user) => user === ids);
  } else if (Array.isArray(ids)) {
    user.push(...ids);
    return user;
  } else {
    return user;
  }
}

console.log(findNum([4, 5, 6]));
