let a11: symbol = Symbol(1);
let a12: symbol = Symbol(1);

console.log(a11, a12, a11 === a12);
console.log(Symbol.for("woodbell") === Symbol.for("woodbell"));

let obj1 = {
  name: 1,
  [a11]: 111,
  [a12]: 222,
};

console.log(obj1);

console.log(Object.keys(obj1));
console.log(Object.getOwnPropertyNames(obj1));
console.log(Object.getOwnPropertySymbols(obj1));
console.log(Reflect.ownKeys(obj1));
