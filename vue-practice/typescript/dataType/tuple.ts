const info: [string, number, number] = ["123", 123, 321];

function useState<T>(state: T) {
  let currentState = state;

  const changeState = (newState: T) => {
    currentState = newState;
  };

  // const arr: any[] = [currentState, changeState];
  const tuple: [T, (newState: T) => void] = [currentState, changeState];
  // return arr;
  return tuple;
}
const [counter, setCounter] = useState(10);
setCounter(1000);
const [title, setTitle] = useState("abc");
const [flag, setFlag] = useState(true);

type MyFunction = () => void;
const foo: MyFunction = () => {};
export {};
