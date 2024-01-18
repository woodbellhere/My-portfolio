let phone: number = 17778965825;
let telephone: number | string = "028-80082083";

let fn = function (type: number | boolean): boolean {
  return !!type;
};

interface People {
  name: string;
  age: number;
}

interface Man {
  sex: number;
}

const woodbell = (man: People & Man): void => {
  console.log(man);
};

woodbell({ name: "woodbell", age: 20, sex: 1 });

let fn3 = function (num: number | string): void {
  console.log((num as string).length);
};

fn3(15792);
