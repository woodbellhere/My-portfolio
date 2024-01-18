const fn4 = (type: any) => {
  if (type === "red") {
    return 0;
  } else if (type === "green") {
    return 1;
  } else if (type === "blue") {
    return 2;
  }
};

let obj = {
  red: 0,
  green: 1,
  blue: 2,
};

enum Color {
  red,
  green,
  blue,
}

interface A2 {
  red: Color.red;
}

enum Types {
  success,
}

let success: number = Types.success;

let key = Types[success];

console.log(`${success}, ${key}`);

console.log(Color.red);
console.log(Color.green);
console.log(Color.blue);
