interface ABC {
  name: string;
  age: number;
  [propName: string]: any;
}

interface ABC {
  Ikun: boolean;
}

let a: ABC = {
  name: "woodbell",
  age: 123,
  Ikun: true,
  a: 1,
  b: "2",
  c: false,
};

interface readABC extends readCBA {
  name: string;
  age?: number;
  readonly id: number;
  readonly callback: () => boolean;
}

interface readCBA {
  xxx: string;
}

let A: readABC = {
  name: "woodbell",
  age: 25,
  id: 1,
  callback: () => {
    return true;
  },
  xxx: "xxx",
};

interface FN {
  (name: string): number[];
}

const fn: FN = function (name: string) {
  return [1];
};

export {};
