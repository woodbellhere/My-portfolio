type IDType = number | string;
function printID(id: IDType) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

type Direction = "left" | "right" | "top" | "bottom";
function printDirection(direction: Direction) {
  switch (direction) {
    case "left":
      break;

    default:
      break;
  }
}

function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString());
  } else {
    console.log(time);
  }
}

class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) {
    p.studying();
  } else {
    p.teaching();
  }
}

type Fish = {
  swimming: () => void;
};

type Dog = {
  running: () => void;
};

function walk(animal: Fish | Dog) {
  if ("swimming" in animal) {
    animal.swimming();
  }
}

const fish: Fish = {
  swimming() {
    console.log("swimming");
  },
};

walk(fish);

export {};
