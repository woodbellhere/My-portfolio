interface User {
  name: string;
  age: number;
}

type PromiseType = Promise<User>;

type GetPromiseType<T> = T extends Promise<infer U> ? U : T;

type T = GetPromiseType<PromiseType>;

type Bar<T> = T extends { name: infer N; age: infer A } ? [N, A] : T;
