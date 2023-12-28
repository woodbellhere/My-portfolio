function printID(id: number | string) {
  console.log(id);
}

// function foo(message?: string) {
function foo(message: string | undefined) {
  console.log(message);
}

type IDType = string | number | boolean;
function printId(id: IDType) {}

export {};
