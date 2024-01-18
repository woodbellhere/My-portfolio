const Base: ClassDecorator = (target) => {
  console.log(target);
  target.prototype.name = "woodbell";
  target.prototype.fn = () => {
    console.log("its fool");
  };
};

@Base
class Http {}

const http = new Http() as any;

http.name;
http.fn(http.name);
//  相当于

Base(Http);
http.fn();

// 整点柯里化

const BaseCurry = (name: string) => {
  const fn: ClassDecorator = (target) => {
    console.log(target);
    target.prototype.name = name;
    target.prototype.fn = () => {
      console.log("its fool");
    };
  };
  return fn;
};

const Get = (url: string) => {
  const fn: MethodDecorator = (target, key, descriptor: PropertyDecorator) => {
    console.log(target, key, descriptor);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        descriptor.value(data);
      });
  };
  return fn;
};

@BaseCurry("woodbell")
class Http2 {
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(data: any) {
    console.log(data);
  }
  @Post()
  create() {}
}

const http2 = new Http2() as any;
