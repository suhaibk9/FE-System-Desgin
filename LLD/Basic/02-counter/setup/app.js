const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

let count = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("decrease")) {
      count--;
    } else if (e.currentTarget.classList.contains("increase")) {
      count++;
    } else {
      count = 0;
    }
    if (count < 0) value.style.color = "red";
    else if (count > 0) value.style.color = "green";
    else value.style.color = "black";
    value.textContent = count;
  });
});
