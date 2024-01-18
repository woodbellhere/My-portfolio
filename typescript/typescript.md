# ts 随手记

## 不太主要的类型

- any
- unknown 只能赋值给自身或 any
  - 作为对象时，由于 unknown，所以啥属性和方法也读不到
  - 由于比 any 安全，所以在面对不确定数据时优先使用 unknown
- void 其实 js 自己有，按理说无输出的函数都默认返回这个才对，但其实还是返回了 undefined

## 对象类型的门道

- Object 作为原型链的顶端，也基本包含所有类型
- object 一般作为非原始类型/引用类型的一种类型（或者说泛型），确实就是 js 自己的 type 内容
- {}等于 new Object 基本是一样的,但是作为字面量不能进行后续修改

## 接口类型和 type

- 常用于定义对象， 但也可以用于定义函数(key 就是参数，value 就是返回值)

```typescript
interface FN {
  (name: string): number[];
}

const fn: FN = function (name: string) {
  return [1];
};
```

- 对象内容和接口需完全一致，不能多不能少
- 同名 interface 相互合并
- 希望省略无关内容时，可以定义索引签名,相当于一个动态属性，覆盖所有我们想一次性丢进去的属性

```typescript
interface ABC {
  ...
  [propName: string]: any;
}
```

- 希望属性方法只能读取/调用而不能修改时，使用 readonly 修饰即可
- 接口之间 extends 就能显式地合并内容
- type 没合并，interface 可以合并

## 数组类型

- 定义主要是'type[]', 'Array<type>'两种方法
- 记得对象数组也非常适合用 interface 先定义对象
- 二维数组在类型部分加两个括号 let arr:number[][] 就行，以此类推
  - 泛型就 let arr:Array<Array<number>> 套娃即可
  - 大杂烩数组就可以用 arr:any[]
  - 参数展开语法之后也是数组，也经常可以用 any[]
  - ts 提供了内置的 IArguments 来接函数参数

## 函数类型

- 参数和返回值的类型都要定义，一般就在参数括号的后面跟类型
- 默认值和可选参数都能使用，但不能在同一个参数上同时使用
- 参数自然可以传对象，因此 interface 定义对象还是用得上
- ts 有对 this 的类型增强，可以在第一个参数处手动定义 this 类型传入函数
- 还有最带劲的函数重载，一套函数，能接收多种参数组合，能实现不同功能

```typescript
let user: number[] = [1, 2, 3];
function findNum(id: number): number[];
function findNum(add: number[]): number[];
function findNum(): number[];
function findNum(ids?: number | number[]): number[] {
  if (typeof ids === "number") {
    return user.filter((user) => user === ids);
  } else if (Array.isArray(ids)) {
    user.push(...ids);
    return user;
  } else {
    return user;
  }
}
```

## 内置类型和 new 类型

- 只要是 new 出来的变量，类型就是构造函数
  - 比如 let num：Number = new Number(123)
- ts 也内置了 dom 的类型
  - 一般元素就是 HTMLxxxElement，没有特定指向的就是 HTMLElement
  - 实在没有想法可以用 as Element
  - 如果类型实在不固定，可以用 xxx:NodeListOf<HTMLDivElement | HTMLElement> = xxx
- webStroage 一般是 storage
- promise 的类型 Promise<type>还要在类型里加上返回值类型

## ts 的 class

- 应该算加强版的，定义 class 的 interface 之后，定义 class 的时候可以 implementsinterface，明确指定类的实现方式
- 有 implements 关键字，内部属性方法有 readonly，private protected 这些关键字
  - private 纯粹是类方法 子类上也用不了
  - protected 子类就能用了
- super 就是调父类的构造函数 prototype.constructor.call
- static 只能调明确定义 static 的属性

### class 中的抽象类

- 声明 class 加 abstract 就是了
- 抽象类整体只能用于描述，而不能用于实现,也不能被实例化
- 往往作为一个被 extend 的扩展基准，作为一种开发规范这种

## 枚举和元组

- 元组先不管他
- 枚举基本类似于多个 if 返回相应值或者对象中的属性
- ts 中的 enmu 默认从 0 开始，但你如果显式指定第一个值为 n，则后面的递增
  - 如果给任意枚举值赋值字符串，因为后面没有自动填充了，所以最好一次性都赋好值
  - 混合赋值没啥用
  - 接口中自然也能使用枚举
- 如果用 const 一个枚举，那么和没用的区别在于编译后的 js 也用常量，一般的则用一个立即执行的函数封好的对象
- 反向映射, enmu 也可以根据值查找 key

```typescript
enum Types {
  success,
}

let success: number = Types.success;

let key = Types[success];
```

## never 类型

- 在联合类型的 never 会被直接忽略
- 比如 string 和 number 交叉类型就是 never，因为按照 extends 的逻辑你也没法扩展
- 如果有函数需要抛出错误，则函数返回值类型定为 never 比较合适,也能提醒你定义的值可能跟最早不一样的

```typescript
type XHZ = "sing" | "dance" | "rap";

function kun(value: XHZ) {
  switch (value) {
    case "sing":
      break;
    case "dance":
      break;
    case "rap":
      break;
    default:
      const error: never = value;
      break;
  }
}
```

## Symbol 类型

- 一般来讲 symbol 会注册新的内存空间，所以你传进去什么值都是唯一的
- 但是类方法 for 会在所有注册的 symbol 里查找 key，所以这里是唯一有可能让 symbol 相等的地方
- 主要的应用场景是作为对象中的单独 key，避免命名冲突？
  - symbol 作为 key 时，只能被 object 的 getOwnPropertySymbols()方法获取到
  - 想要同时取到一般属性和 symbol 属性时，就需要使用 refelct.ownkeys
- 迭代器的语法糖就是 for-of
- 对象身上没迭代协议，所以不能用 for-of

## 生成器与迭代器

- for-of 就是手动迭代器的语法糖
- 对象没迭代协议，一般不能用 for-of
  - 除非在对象中手动添加 iterator（）这些
- 解构与展开语法都是对迭代器的包装

## 类型的等级（包含与被包含的次序）

- any 和 unknown 都是顶级类型 top type
- Object
- Number String 这些包装类
- number string 和 boolean
- 1 'woodbell' false 这些字面量
- never 是最低级
- 高级类型 extends/包含低级类型

## 类型组合 断言 联合类型 交叉类型

- 强制类型转换！！，js 里到 ts 也能用
- & 交叉类型基本类似于 extend 或者 object.assign
- 类型断言，在类型不明确时，可以告诉编译器，下一步具体要做啥
  - 当然，这里只是骗编译器，实际运行时如果类型不对，编译器还是按正常方式运行

```typescript
let fn3 = function (num: number | string): void {
  //这里number类型自然没length
  // 所以要手动 console.log((num as string).length)
  console.log(num.length);
};

fn3("15397");
```

## 类型推论和别名

- ts 可以根据数值字面值自动推断变量类型
- extends 实际上是包含的语义，某种意义上相当于 typeof

## 泛型 参数的抽象/动态类型

- 当我们想把参数类型也进一步抽象时
- 很多时候会发现函数逻辑一致，但由于参数不一致而导致要重复写几套逻辑
- 可以在 interface 或 type 中加入泛型，以进一步节省代码
- 泛型可以支持多个也支持多种
- 泛型同样支持默认值
- 一个常见场景就是确定 axios 接收 promise 的泛型
  - 接口一般也是重要参数显式指定，其余参数索引签名完事
- 因为实际类型间的操作当然也是有限制有规矩的，所以泛型也有自己的约束
  - 泛型中跟 extends，记得 extends 基本等于包含
  - extends 的类型自然也可以是自定义接口，比如你可以专门定义一个“有 length”的接口
  - keyof 专门指向对象的属性，在泛型约束中用于确定只需要对象的特定属性

```typescript
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

type Key = keyof typeof obj;

function ob<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

## tsconfig 文件

compilerOpptions

- increment，要不要先生成一个缓存文件用于后续编译
- tsBuildFile increment 编译文件的存储位置
- diagnostics 诊断信息日志
- target 把代码编译到什么 js 代码的版本
- module 依赖的模块标准
- lib 引用文件所需的库
- allowjs 和 checkjs，即允许和同时对 js 代码进行检查
- outdir 编译后文件的输出目录
- rootdir 就从跟文件开始指定输出目录
- declaration 生成声明文件 d.ts
- declarationDir 声明文件输出目录
- emitDeclarationOnly 只生成声明文件,不编译 js
- sourceMap 生成 sourceMap
- inlineSources 生成 sourceMap 同时把源代码嵌入到生成的 js 文件中
- declarationMap 生成声明文件的 sourceMap
- types typeRoot 三方包中的类型和文件目录
- removeComments 移除注释
- noEmit 只做类型检查，不做代码生成
- noEmitOnError 出错时不生成代码
- downlevelIteration 降级遍历器
- strict 严格模式
- alwaysStrict 总是以严格模式检查
- noImplicitAny 禁止隐式 any
- strictNullChecks 严格检查空值,不允许把 null 和 undefined 赋值给其他变量
- strictFunctionTypes 不允许函数双向协变
- strictPropertyInitialization 类的实例属性必须初始化
- strictBindCallApply 严格的 bind/call/apply 检查
- noImplicitThis 不允许 this 有隐式 any
- noUnusedLocals 检查未使用的局部变量
- noUnusedParameters 检查未使用的参数
- noFallthroughCasesInSwitch 不允许 switch 语句贯穿,没有 break 就干脆不执行
- moduleResolution 模块解析方式，默认按 node 方式
- baseUrl 解析非相对路径的基准目录,默认当前目录
- jsxFactory jsx 语法的解析器
- jsx 也是解析器相关
- paths 相对于 baseUrl 的路径映射

include

- 要编译的文件，基本是某种正则

exclude

- 不编译的文件

files

- 手动指定哪些文件使用这里的编译配置

## namespace 命名空间

- 其中所有内容都要明确导出才能使用
- 命名空间可以嵌套，里层 namespace 本身也需要 export
- 同名命名空间会合并
- 由于这玩意以看就是用来模块化的，所以自然也适合做跨端

## 三斜线指令

- 看样子和 import 差不多

## d.ts 文件

- 告诉别人你代码的正确用法
- 三方库要么自己写好了，要么社区的统一命名规范都是 @type/xxx

## mixins

- 跟对象合并有关
  - 可以用扩展运算符，实际上是浅拷贝
  - object.assign 交叉类型
- 混入有相对特殊的写法，注意文件 mixins

## 装饰器

- 不干扰各数据结构的原本样貌
- 代码清晰复用

- 类装饰器 classDecorator
  - @可以自动注入执行
  - 原理相当于 装饰器(被装饰类)
- 属性装饰器
- 参数装饰器
- 方法装饰器
- 装饰器工厂
- import reflect-metadata
- axios

## 类型守卫 以及类型缩小

- typeof 和 instanceof 这些都常见
- 需要注意 is
  - 就是 isStr = (str:any):str is string => typeof str === 'string'
  - 假设后面的 typeof 为 true，则前面的 is 也发挥作用

## 协变或鸭子类型

- ts 的类型基于结构类型，即数据结构的形状，看起来是啥样
- 原则就是子类只能多不能少
- 如果一个主类型的属性完全被一个子类型覆盖（拥有所有父类型属性），则子类型可以赋值到父类型，即协变
- 逆变则就是子类型也可以赋值为父类型

## 泛型工具

- partial Partial<xxxInterface>
  - 即泛型中所有属性均为可选
- required
  - 即泛型中所有属性均为必选
- pick type PartOfUser = Pick<User, "address" | "name">;
  - 只需要泛型中部分属性
- exclude type DONTneed = Exclude<"a" | "b" | "c", 'c' | "a">;
  - 排除部分属性
  - 似乎是取差集
- omit type DeleteSth = Omit<User, 'age' |'name'>
  - 排除部分属性，和 pick 相反
- Record
  - 约束对象 key 和 value，接收两个泛型
  - key 必须都有，value 只要是约定的就行

```typescript
type Key1 = "c" | "x" | "k";
type Value1 = "sing" | "dance" | "rap";

let obj3: Record<Key1, Value1> = {
  c: "sing",
  x: "dance",
  k: "rap",
};
```

- ReturnType
  - 获取函数类型的返回值

## infer

- 通俗讲是推导泛型的参数
- 只能出现在 extends 关键字的右边

```typescript
interface User {
  name: string;
  age: number;
}

type PromiseType = Promise<User>;

type GetPromiseType<T> = T extends Promise<infer U> ? U : T;

type T = GetPromiseType<PromiseType>;
```
