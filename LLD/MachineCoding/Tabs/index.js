const tabData = [
  { id: "1", title: "Title 1", content: "This is for Content 1" },
  { id: "2", title: "Title 2", content: "This is for Content 2" },
  { id: "3", title: "Title 3", content: "This is for Content 3" },
  { id: "4", title: "Title 4", content: "This is for Content 4" },
];

document.addEventListener("DOMContentLoaded", () => {
  const tabContentContainer = document.getElementById("tabContentContainer");
  const tabContainer = document.getElementById("tabContainer");
  let activeTabId = tabData[0].id;
  const renderTab = () => {
    tabData.forEach((tab) => {
      const btn = document.createElement("button");
      btn.classList.add("tabLinks");
      btn.textContent = tab.title;
      btn.setAttribute("data-tab", tab.id);
      tabContainer.append(btn);
      const div = document.createElement("div");
      div.setAttribute("id", tab.id);
      div.classList.add("tabContent");
      div.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`;
      tabContentContainer.append(div);
    });
  };
  const openTab = (tabId) => {
    const tabContent = document.querySelectorAll(".tabContent");
    const tabLink = document.querySelectorAll(".tabLinks");
    tabContent.forEach((tab) => tab.classList.remove("active"));
    tabLink.forEach((tab) => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document
      .querySelector(`button[data-tab="${tabId}"]`)
      .classList.add("active");
  };
  tabContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("tabLinks")) {
      const id = e.target.dataset.tab;
      if (id != activeTabId) {
        openTab(id);
        activeTabId = id;
      }
    }
  });
  renderTab();
});
