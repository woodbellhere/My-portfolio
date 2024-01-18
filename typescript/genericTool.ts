interface User {
  address?: string;
  name?: string;
  age?: number;
}

// partial的原理
type HomeMadePartial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;

// required的原理
type HomeMadeRequired<T> = {
  // 这个减号就是不要？的意思
  [P in keyof T]-?: T[P];
};
type RequiredUser = Required<User>;

// Pick的原理，就是指定特定key，然后extends来约束就行
type HomeMadePick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PartOfUser = Pick<User, "address" | "name">;

// exclude的原理，k要包含t，不然返回相应never或值
type HomeMadeExclude = <T,K> = T extends K ? never : T;
type DONTneed = Exclude<"a" | "b" | "c", 'c' | "a">;


// Omit的原理，先exclude再pick
type HomeMadeOmit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>> 

type DeleteSth = Omit<User, 'age' |'name'>

// Record的实现
type ObjKey = keyof any
type HomeMadeRecord<K extends ObjKey, T> = {
  [P in K]: T
}

type Key1 = 'c' | 'x' |'k'
type Value1 = 'sing' |'dance' | 'rap'

let obj3:Record<Key1, Value1> = {
  c: 'sing',
  x: 'dance',
  k: 'rap'
}

// returnType 实现
type HomeMadeReturnType<F extends Function> = F extends (...args: any[]) => infer R ? R : any;

const fn5 = () => [1,2,3,'asssa', {}]

type arrNum = ReturnType<typeof fn5>