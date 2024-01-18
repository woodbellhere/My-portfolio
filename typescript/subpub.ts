interface MyEvent {
  on: (name: string, fn: Function) => void;
  emit: (name: string, ...args: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface EventList {
  [key: string]: Array<Function>;
}

class Dispatch implements MyEvent {
  EventList: EventList;
  constructor() {
    this.EventList = {};
  }
  on(name: string, fn: Function) {
    const cb = this.EventList[name] || [];
    cb.push(fn);
    this.EventList[name] = cb;
  }
  emit(name: string, ...args: Array<any>) {
    let eventName = this.EventList[name];
    if (eventName) {
      eventName.forEach((fn) => {
        fn.apply(this, args);
      });
    } else {
      console.error("wrong name");
    }
  }
  off(name: string, fn: Function) {
    let eventName = this.EventList[name];
    if (eventName && fn) {
      let index = eventName.findIndex((fnIdx) => fnIdx === fn);
      eventName.splice(index, 1);
      console.log(eventName);
    } else {
      console.error("wrong name");
    }
  }
  once(name: string, fn: Function) {
    let tempFn = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, tempFn); // 执行一次后移除
    };
    this.on(name, tempFn);
  }
}
