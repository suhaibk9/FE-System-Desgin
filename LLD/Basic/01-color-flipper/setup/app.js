const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById("btn");
const colorSpan = document.getElementById("color");
const randomIndex = () => {
  return Math.floor(Math.random() * colors.length);
};
``;
btn.addEventListener("click", (e) => {
  const idx = randomIndex();
  document.body.style.backgroundColor = colors[idx];
  colorSpan.textContent = colors[idx];
});
