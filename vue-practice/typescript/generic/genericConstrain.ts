// function getLength(args: string | any[]) {
//   return args.length;
// }

interface ILength {
  length: number;
}

function getLength<T extends ILength>(args: T) {
  return args.length;
}

getLength("abc");
getLength(["abc", "cba"]);
getLength({ length: 100 });
