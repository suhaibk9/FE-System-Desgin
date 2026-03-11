const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn = document.getElementById("btn");
const colorSpan = document.querySelector(".color");
const randEle = () => hex[Math.floor(Math.random() * hex.length)];
const randomColorGenerator = () => {
  let colorStr = "#";
  for (let i = 1; i <= 6; i++) colorStr += randEle();
  return colorStr;
};
btn.addEventListener("click", () => {
  const randColor = randomColorGenerator();
  console.log("Rand", randColor);
  document.body.style.backgroundColor = randColor;
  colorSpan.textContent = randColor;
});
