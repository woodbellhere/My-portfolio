function handleMessage(message: string | number) {
  switch (typeof message) {
    case "string":
      console.log("string way of handling message");
      break;
    case "number":
      console.log("number way of handling message");
      break;
    case "boolean":
      console.log("boolean way of handling message");
      break;
    default:
      const check: never = message;
  }
}
