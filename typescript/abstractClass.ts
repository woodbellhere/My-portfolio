abstract class Vue {
  name: string;
  constructor(name?: string) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  abstract init(name: string): void;
}

// new Vue();
class React extends Vue {
  constructor() {
    super();
  }
  init(name: string) {}
  setName(name: string) {
    this.name = name;
  }
}

const react = new React();
react.setName("react");
