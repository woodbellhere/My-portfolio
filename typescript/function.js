"use strict";
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
const add2 = (a = 30, b = 50) => a + b;
console.log(add2());
function add3(user) {
    return user;
}
console.log(add3({ name: "John", age: 30 }));
let objfn = {
    user: [1, 2, 3],
    add(num) {
        this.user.push(num);
    },
};
objfn.add(4);
console.log(objfn);
let user = [1, 2, 3];
function findNum(ids) {
    if (typeof ids === "number") {
        return user.filter((user) => user === ids);
    }
    else if (Array.isArray(ids)) {
        user.push(...ids);
        return user;
    }
    else {
        return user;
    }
}
console.log(findNum([4, 5, 6]));
