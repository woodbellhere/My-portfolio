function sum(
  num1: number | string | any[] | { length: number },
  num2: number | string | any[] | { length: number }
) {}

function sum2<Type>(num1: Type): Type {
  return num1;
}

sum2<number>(20);
sum2<{ name: string }>({ name: "wood" });
sum2<any[]>(["abc"]);

function foo<T, E>(arg1: T, arg2: E) {}

foo<number, string>(10, "abc");
export {};
