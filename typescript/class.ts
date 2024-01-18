interface Options {
  el: string | HTMLElement;
}

interface VueClass {
  options: Options;
  init(): void;
}

interface Vnode {
  tag: string;
  text?: string;
  children?: Vnode[];
}

class Dom {
  private createElement(el: string) {
    return document.createElement(el);
  }
  private setText(el: HTMLElement, text: string | null) {
    el.textContent = text;
  }
  protected render(data: Vnode) {
    let root = this.createElement(data.tag);
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item) => {
        let child = this.render(item);
        root.appendChild(child);
      });
    } else {
      this.setText(root, data.text);
    }
    return root;
  }
}

class Vue extends Dom implements VueClass {
  options: Options;
  constructor(options: Options) {
    super();
    this.options = options;
    this.init();
  }
  init(): void {
    let data: Vnode = {
      tag: "div",
      children: [
        {
          tag: "section",
          text: "this is subnode 1",
        },
        {
          tag: "section",
          text: "this is subnode 2",
        },
      ],
    };
    let app =
      typeof this.options.el === "string"
        ? document.querySelector(this.options.el)
        : this.options.el;
    app.appendChild(this.render(data));
  }
}

new Vue({
  el: "#app",
});
