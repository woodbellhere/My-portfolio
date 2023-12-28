class Person {
  public name: string = "";
  private name2: string = "123";
  protected name3: string = "321";
  readonly name4: string = "readOnly";

  getName() {
    return this.name2;
  }
}

class Person2 extends Person {
  getName() {
    return this.name3;
  }
}
const p = new Person();
const p2 = new Person2();
console.log(p.name);
console.log(p.name2);
console.log(p.getName());
console.log(p2.name3);

export {};
