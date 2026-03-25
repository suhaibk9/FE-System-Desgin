// //const sum=calculator('add')(1)(2);
// const calculator = (opt) => {
//   return (a) => {
//     return (b) => {
//       opt = opt.toLowerCase();
//       if (opt === "add") {
//         return a + b;
//       } else if (opt === "subtract") {
//         return a - b;
//       } else if (opt === "multiply") {
//         return a * b;
//       }
//     };
//   };
// };
// const add = calculator("add")(1)(2);
// const subtract = calculator("subtract")(1)(2);
// const product = calculator("multiply")(1)(2);
// console.log("sum", add);
// console.log("difference", subtract);
function add(a) {
  return function (b) {
    if (b) {
      return add(a + b);
    } else {
      return a;
    }
  };
}
// Test cases for curried add function
const add1 = add(1)(2)(3)(4)(); // 10
const add2 = add(5)(10)(); // 15
const add3 = add(100)(); // 100
const add4 = add(-2)(-3)(5)(); // 0
const add5 = add(1)(1)(1)(1)(1)(1)(); // 6

console.log(add1); // 10
console.log(add2); // 15
console.log(add3); // 100
console.log(add4); // 0
console.log(add5); // 6
