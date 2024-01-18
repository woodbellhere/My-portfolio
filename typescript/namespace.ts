namespace Test {
  export let a = 1;
  export const add = (a: number, b: number) => a + b;
}

console.log(Test.add(Test.a, 2));
