const boxConfig = [
  { color: "red", width: "33.3%" },
  { color: "black", width: "33.3%" },
  { color: "blue", width: "33.3%" },
  { color: "orange", width: "50%" },
  { color: "green", width: "50%" },
  { color: "purple", width: "70%" },
  { color: "pink", width: "30%" },
];
window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.append(container);
  boxConfig.forEach((config, idx) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = config.color;
    box.setAttribute("data-color", config.color);
    box.style.width = config.width;
    container.append(box);
  });
  container.addEventListener("click", (e) => {
    const boxTarget = e.target;

    if (boxTarget.classList.contains("box")) {
      const colorClicked = boxTarget.dataset.color;
      window.alert(`Box with color ${colorClicked} clicked`);
    }
  });
});
