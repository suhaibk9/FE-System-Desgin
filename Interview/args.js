const baseX = (x) => {
  return (y) => {
    return x + y;
  };
};
const base6 = baseX(6);
const add10 = base6(10);
console.log(add10);
function find() {
  let ar = [];
  for (let i = 0; i < 1000000; i++) ar.push(i * i);
  return (x) => x * x;
}
const f = find();
console.log(f(2));
