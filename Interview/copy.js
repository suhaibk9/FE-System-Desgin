function ShallowCopy(obj) {
  return { ...obj };
}
let originalObj = {
  name: "suhaib",
  age: 29,
  address: {
    city: "Liverpool",
  },
};

let shallowObj = ShallowCopy(originalObj);
shallowObj.name = "Khan";
shallowObj.address.city = "London";
console.log(originalObj, shallowObj);

function deepCopy(obj) {
  return structuredClone(obj);
}
function myDeepCopy(obj) {
  if (typeof obj !== "object") return;
  const copyObj = Array.isArray(obj) ? [] : {};
  for (let key in copyObj) {
    copyObj[key] = obj[key];
  }
  return copyObj;
}
