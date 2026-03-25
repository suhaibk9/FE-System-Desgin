const mymap = (ar, cb) => {
  let result = [];
  for (let i = 0; i < ar.length; i++) {
    result.push(cb(ar[i], i));
  }
  return result;
};
Array.prototype.mymap = mymap;
const ar = [1, 2, 3, 4];
const squaredAr = ar.mymap(ar, (item, index) => item * item);
console.log(squaredAr);
console.log(Array.prototype.__proto__);
