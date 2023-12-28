interface IPerson {
  name: string;
  age: number;
}

interface Person<T1, T2> {
  name: T1;
  age: T2;
}

interface Person2<T1 = string, T2 = number> {
  name: T1;
  age: T2;
}

const p: Person<string, number> = {
  name: "wood",
  age: 25,
};

export {};
