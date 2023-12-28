ts 只是一个集合

- 用集合操作的思维来看待 ts
- ts 是结构（样子和格式）而非命名的类型系统

js 和 ts 编译差异

- js 的属性类型信息似乎只能来自 class 中的 constructor
- class 在 ts 中是一种 namespace

ts 编译作用域

- ts 默认按文件夹级别进行编译，所以不同文件出现同一个名字也命名冲突
- 所以最好加个 export {} ts 就知道你指定具体作用域了

常见数据类型

- string 小写是 ts 的字符串类
- number 和 boolean 是 ts 中的数值和布尔类
- String 大写是 js 的字符串包装类
- Number 和 Boolean 也是 js 中的包装类
- literal 值本身也可以作为类型

ts 的类型推断

- 根据初次赋值的情况进行类型推断
- 如果很容易就能让 ts 推断数据类型，则不需要加类型注释

ts 中的数组

- 数组元素的类型最好是固定的
- 用 Array<string>这种泛型方式指定
- 简写是 string[]

ts 中的对象

- 不要用 object 类型注释，会出错

ts 中的 null 和 undefined

- 在默认的严格类型检查下，null 和 undefined 只接收这两个值
- 这个感觉破坏了它俩作为占位符的常规用法

ts any 和 unknown

- anyscript 嘛
- 可以在复杂的类型断言中当个临时中介
- unknown 主要用于返回类型不确定的函数，比如一个 if 后可以返回数值，也可以返回‘sorry’
- unknown 只能赋值给 any 和 unknown 类型，由于 any 很多时候过于灵活，所以一般最好用 unknown

ts void

- 其他语言常见的函数返回值，就是不返回

ts never

- 不该有任何返回值的类型
- 比如死循环或者异常

ts tuple

- 可以塞入指定类型数据的数组吧
- const info: [string, number, number] = ["123", 123, 321];
- 就像这样，[type]注意和 type[]的数组区分
- 似乎是在解构函数返回值比较有用

ts 函数类型

- 函数的参数和返回值都有类型注释，其实 js 里函数默认的返回值是 undefined
- 多半是匿名函数的回调函数如果能通过上下文明确自己的类型，则也不需要类型注释
- 复杂的函数参数可以通过对象形式定义
  `function printPoint(point: { x: number; y: number })`
- 参数后面加？就是可选参数,但必须写在可选类型后面
- 参数后面加？就是一定非空，相当于替代 if(value){do(value)}
- 因为 function 是关键字，所以不能用，定义其实是下面这种“以形补形”
- const foo: （() => void） = () => {};
- 或者定义一个 type MyFunction = () => void

ts type & interface

- 总体上文档支持 interface
- 只在需要特别具体的值时使用 type

ts union

- | 可以为一个数据指定多种可能类型和可能值
- 往往依赖 narrowing 的工作
- ts 的可选类型是通过 undefined 的 union 实现的
- 一种流行的实现是指定具体值，当枚举用？

ts alias

- 过于冗长繁琐的类型注释，比如 union 类都短不了，可以用 type 来封装
- 然后将这个 type 作为类型注释即可

ts assertion

- dom 获取时 ts 只能知道它是一个元素，但不知道具体是什么元素，这时候需要额外的补充信息
- 或者帮助 ts 获取我们自定义的 class 一类数据时有用，有时候复杂的继承关系会让 ts 不清楚你到底想获取哪一个类的信息
- 可以通过数据 as any 再 as 任意类型的方式规避类型检查
- 非空类型断言

ts generic

- 为 type 提供变量

ts duck type & structural type

- 按 shape，数据的格式来形成 type

ts 字面量推断

- 很多时候会误导 ts 实际的数据类型

```javascript
type Method = "GET" | "POST";

function request(url: string, method: Method) {}

const options = {
  url: "https://www.woodbell.org",
  method: "POST",
};

request(options.url, options.method);
```

- request 调用中的 options.method 会自动推断 method 为一个 string，恰好和 Method 作为类型冲突
- 这时候做一些 as 推断 options.method as Method 就完事
- 更完善的办法就是直接对 option 加类型注释，method:Method 解决所有问题
- 还可以给 options 整体加 as const 彻底变成 c 了

ts narrowing

- 可以通过 typeof === ‘number’这种方式来缩小原来赋值的类型注解
- 类型保护
  - typeof
  - 相等不等以及 switch 的缩小
  - instanceof
  - in

ts overload

- 函数相同，但参数不同。根据传入的不同参数来适用不同的函数内部逻辑
- ts 中，首先需要定义多个不同参数和返回值类型的函数签名
- 然后再定义通用的函数逻辑，参数和返回值的类型都需要更加宽泛，很多时候可以直接指定 any

```javascript
function addOver(num1: number, num2: number): number;
function addOver(num1: string, num2: string): string;

function addOver(num1: any, num2: any): any {
  return num1 + num2;
}
```

- 但实现的通用函数本身不能调用

ts union & overload

- 一般来说简单的实现推荐用 union

ts override

- class 继承中可以在子类中重写函数来覆盖父类函数

ts 多态

- 父类引用/类型指向子类实例
- 指定父类作为类型注释时，调用相关字类的同名方法也会自动指向字类方法

```javascript
class Animal {
  action() {
    console.log("animal action");
  }
}

class Dog extends Animal {
  action() {
    console.log("dog action");
  }
}

class Fish extends Animal {
  action() {
    console.log("fish action");
  }
}
// 此处调用子类方法
function makeActions(animals: Animal[]) {
  animals.forEach((animal) => {
    animal.action();
  });
}

makeActions([new Dog(), new Fish()]);
```

ts class modifier

- public 默认
- private 和 protected 常见
- readOnly 只能在 constructor 中赋值，其后不可更改
- static 只能类调用

ts class type

- class 本身也可以作为类型传给对象

ts interface

- 用法基本和 type 一致
- type 主要用来非对象，interface 索性用 interface
- interface 还能用继承
- 也可以定义索引类型，这个多少跟键值对格式有点关系

```javascript
interface IndexFormat {
  [index: number]: string;
}
const choice: IndexFormat = {
  0: "HTML",
  1: "CSS",
  2: "JS",
  3: "Vue",
};
```

ts generic

- 我们希望一套接口/代码能够适用不同情况
- 而让传入的参数动态决定已有代码的类型就是这样一种尝试
- 泛型就来来了

```javascript
function sum2<Type>(num1: Type, num2: Type {}
// 指定一个变量Type，让Type充当参数，在具体参数传入时动态决定类型
sum2<number>(20, 30);
```

- Type 一般简写为 T
- Element 为 E
- Key, Value 为 K,V
- Object 为 O
- 可以自定义

- 即使是泛型也有 narrow 的需求，这里主要采取对泛型做约束的方法

```javascript
interface ILength {
  length: number;
}
// 这样就可以限制传入类型必须要有length属性
function getLength<T extends ILength>(args: T) {
  return args.length;
}
```
