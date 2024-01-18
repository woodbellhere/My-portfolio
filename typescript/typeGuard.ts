const isString = (str: any) => typeof str === "string" || str instanceof String;
const isNumber = (str: any) => typeof str === "number";
const isObject = (arg: any) => ({}.toString.call(str) === "[object Object]");
const isFn = (arg: any) => typeof arg === "function";
const fnType = (data: any) => {
  if (isObject(data)) {
    let val;
    Object.keys(data).forEach((key) => {
      val = data[key];
      if (isNumber(val)) {
        data[key] = val.toFixed(2);
      }
      if (isString(val)) {
        data[key] = val.trim();
      }
      if (isFn(val)) {
        val();
      }
    });
  }
};
