class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.eating + "eating");
  }
}

const person = new Person("woodbell", 25);

class Person2 {
  name: string = "";
  age: number = 0;

  eating() {
    console.log("eating");
  }
}

class Student extends Person2 {
  no: number = 0;

  studying() {
    console.log("studying");
  }
}

class Teacher extends Person2 {
  title: string = "";

  studying() {
    console.log("studying");
  }
}

const stu = new Student();
stu.name = "bellwood";

class Person3 {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log("eating");
  }
}

class Student2 extends Person3 {
  no: number = 0;
  constructor(name: string, age: number, no: number) {
    super(name, age);
    this.no = no;
  }
  studying() {
    console.log("studying");
  }
  eating() {
    console.log("stu eating");
  }
}
export {};
