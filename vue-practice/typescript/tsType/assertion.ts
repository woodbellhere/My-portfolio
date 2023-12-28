const el = document.getElementById("xxx") as HTMLImageElement;

el.src = "xxx";

class Person {}

class Student extends Person {
  studying() {}
}

function sayHello(p: Person) {
  (p as Student).studying();
}

const stu = new Student();
sayHello(stu);

function printMessageLength(message?: string) {}
