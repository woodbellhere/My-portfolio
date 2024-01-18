interface mixA {
  age: number;
}

interface mixB {
  name: string;
}

let mixa: mixA = {
  age: 18,
};

let mixb: mixB = {
  name: "woodbell",
};

let mixc = { ...mixa, ...mixb };

let mixc2 = Object.assign({}, mixa, mixb);

class Appa {
  run() {
    console.log("run");
  }
}

class Logger {
  log(mes: string) {
    console.log("log");
  }
}

class HTML {
  render() {
    console.log("html");
  }
}

type constructor<T> = new (...args: any[]) => T;

function pluginMixin<T extends constructor<Appa>>(Base: T) {
  return class extends Base {
    private Logger = new Logger();
    private HTML = new HTML();
    constructor(...args: any[]) {
      super(...args);
      this.Logger = new Logger();
      this.HTML = new HTML();
    }
    run() {
      this.Logger.log("run");
    }
    render() {
      this.render();
    }
  };
}
