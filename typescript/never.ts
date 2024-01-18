type A4 = string & number;

function wrong(): never {
  throw new Error("An error!");
}

type B2 = string | number | never;

type XHZ = "sing" | "dance" | "rap";

function kun(value: XHZ) {
  switch (value) {
    case "sing":
      break;
    case "dance":
      break;
    case "rap":
      break;
    default:
      const error: never = value;
      break;
  }
}
