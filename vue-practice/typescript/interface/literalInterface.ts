interface IPerson {
  name: string;
  age: number;
  height: number;
}

const info = {
  name: "wood",
  age: 25,
  height: 1.8,
  address: "earth",
};

const p: IPerson = info;

export {};
