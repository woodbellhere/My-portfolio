let arr3: [number, boolean] = [1, false];
const arr4: readonly [x: number, y: boolean] = [1];

let excel: [string, string, number][] = [
  ["woodbell", "male", 25],
  ["woodbell", "male", 25],
  ["woodbell", "male", 25],
  ["woodbell", "male", 25],
];

type first = (typeof arr4)["length"];
