let moduleFunc = (function () {
  function privateFunc() {
    console.log("private function");
  }
  function publicFunc() {
    privateFunc();
    console.log("Public Function");
  }
  return {
    publicFunc,
  };
})();
const mod = moduleFunc.publicFunc();
