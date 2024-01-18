function* gen() {
  yield "woodbell";
  yield Promise.resolve("woodpeck");
  yield "canary";
  yield* "magpie";
}

const full = gen();
console.log(full.next());
console.log(full.next());
console.log(full.next());

let set: Set<number> = new Set([1, 1, 2, 2, 3, 3]);

let map: Map<any, any> = new Map();

let Arr2 = [1, 2, 3];
map.set(Arr2, "woodbell");
console.log(map.get("woodbell"));

function args() {
  console.log(arguments);
}

// let list = document.querySelector("div");

const each = (value: any) => {
  let It: any = value[Symbol.iterator]();
  let next: any = { done: false };
  while (!next.done) {
    next = It.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
};

let objIter = {
  max: 5,
  current: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.current < this.max) {
          this.current++;
          return {
            value: undefined,
            done: true,
          };
        } else {
          return {
            value: this.current++,
            done: false,
          };
        }
      },
    };
  },
};

for (let value of objIter) {
  console.log(value);
}
