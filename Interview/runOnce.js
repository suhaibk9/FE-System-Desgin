// let view;
// function f() {
//   let flag = true;
//   return () => {
//     if (flag) {
//       flag = false;
//       view = "hello";
//       console.log(view);
//     } else {
//       console.log("Already Ran");
//     }
//   };
// }
// const runOnce = f();
// runOnce();
// runOnce();
// runOnce();
// runOnce();

function once(fn, context) {
  let ran;
  return function () {
    if (fn) {
      ran = fn.apply(context || this, arguments);
      fn = null;
    }
    return ran;
  };
}
const hello = () => console.log("Hello");
const f = once(hello, this);
f();
f();
f();
f();
f();
f();
f();

