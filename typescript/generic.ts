function woodbellFn(a: number, b: number): Array<number> {
  return [a, b];
}

function strFn(a: string, b: string): Array<string> {
  return [a, b];
}

function woodFn<T>(a: T, b: T): Array<T> {
  return [a, b];
}

woodFn(1, 2);
woodFn("wood", "bell");

type A3<T> = string | number | T;

let a15: A3<undefined> = undefined;

interface Data<T> {
  msg: T;
}

let data: Data<string> = {
  msg: "gone",
};

function add<T = number, K = number>(a: T, b: K): Array<T | K> {
  return [a, b];
}

const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(null);
    });
  },
};

interface DataJson {
  message: string;
  code: number;
}

axios.get<DataJson>("./generic.json").then((res) => {
  res.code;
});

function add<T extends number>(a: T, b: T) {
  return a + b;
}

add(1, 2);

interface Len {
  length: number;
}

function lenFn<T extends Len>(a: T) {
  a.length;
}

lenFn("123");
lenFn(123);
lenFn(false);

type Key = keyof typeof obj;

function ob<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
