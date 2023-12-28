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

function makeActions(animals: Animal[]) {
  animals.forEach((animal) => {
    animal.action();
  });
}

makeActions([new Dog(), new Fish()]);
