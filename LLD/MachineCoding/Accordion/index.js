const data = [
  { title: "Title 1", content: "This is Content 1" },
  { title: "Title 2", content: "This is Content 2" },
  { title: "Title 3", content: "This is Content 3" },
  { title: "Title 4", content: "This is Content 4" },
  { title: "Title 5", content: "This is Content 5" },
];
document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector("#accordion");
  data.forEach((sec, idx) => {
    const ele = document.createElement("div");
    ele.classList.add("accordion-item");
    //Header
    const header = document.createElement("div");
    header.classList.add("accordion-header");
    header.textContent = sec.title;
    //Content
    const contentArea = document.createElement("div");
    contentArea.classList.add("accordion-content");
    contentArea.innerHTML = `<p>${sec.content}</p>`;
    ele.append(header, contentArea);
    accordion.append(ele);
    if (idx === 0) {
      ele.classList.add("active");
      contentArea.style.display = "block";
    } else {
      contentArea.style.display = "none";
    }
  });

  accordion.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (header) {
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".accordion-content").style.display = "none";
      });
      if (!isActive) {
        item.classList.add("active");
        content.style.display = "block";
      }
    } else return;
  });
});
