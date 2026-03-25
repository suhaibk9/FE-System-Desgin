const squared = (n1, n2) => {
  for (let i = 0; i < 10000000000; i++) {}
  return n1 * n2;
};
function memoize(fn) {
  let cache = {};
  return function (...args) {
    let argsCache = JSON.stringify(args);
    if (cache[argsCache]) return cache[argsCache];
    else {
      cache[argsCache] = fn.call(this, ...args);
      return cache[argsCache];
    }
  };
}
const memoFunc = memoize(squared);
console.time("first");
const memoValue1 = memoFunc(10, 4);
console.timeEnd("first");
console.time("second");
const memoValue2 = memoFunc(10, 40);
console.timeEnd("second");
