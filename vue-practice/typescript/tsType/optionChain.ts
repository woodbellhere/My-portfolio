type Person = {
  name: string;
  friends?: {
    name: string;
    age?: number;
  };
};

const info: Person = {
  name: "wood",
  friends: {
    name: "bell",
  },
};

export {};
