let nums = {
  one: 1,
  two: 2,
  three: "three",
};
for (let key in nums) {
  if (typeof nums[key] === "number") {
    nums[key] = 2 * nums[key];
  }
}
console.log(nums);
console.log(typeof nums.toString());
