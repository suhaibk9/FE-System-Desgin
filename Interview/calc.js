const calc = {
  total: 0,
  add(x) {
    this.total += x;
    return this;
  },
  sub(x) {
    this.total -= x;
    return this;
  },
  multi(x) {
    this.total *= x;
    return this;
  },
 
};
const result = calc.add(10).sub(2).multi(5);
console.log(result.total);
function f() {
  console.log(this);
}
let user = { g: f.bind(null) };
user.g();
const success=user.login.bind(user,true);
const failed=user.login.bind(user,false);
checkPassword(success,failed)