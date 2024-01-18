interface A3 {
  name: string;
  age: number;
}

interface B3 {
  name: string;
  age: number;
  sex: string;
}

let a3: A3 = {
  name: "i want that fish",
  age: 18,
};

let b3: B3 = {
  name: "i want that fish",
  age: 18,
  sex: "male",
};

let reverA = (param: A3) => {};
let reverB = (param: B3) => {};

reverB = reverA;
reverA = reverB;
