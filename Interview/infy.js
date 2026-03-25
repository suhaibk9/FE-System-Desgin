function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...next) {
        return curried(...args, ...next);
      };
    }
  };
}
const sum = (a, b, c, d) => a + b + c + d;
const curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3, 4)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10
console.log(curriedSum(1, 2)(3, 4)); // 10
console.log(curriedSum(1)(2, 3, 4)); // 10

const obj = {
  city1: "london",
  city2: "liverpool",
  [Symbol.iterator]() {
    let cnt = 0;
    return {
      next() {
        if (cnt == 0) {
          cnt++;
          return { value: obj.city1, done: false };
        } else if (cnt === 1) {
          cnt++;
          return { value: obj.city2, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};
// To get the first value from the iterator:
const iterator = obj[Symbol.iterator]();
const london = iterator.next().value;
console.log(london); // 'london'
f