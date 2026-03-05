// Grab the elements from the DOM
const themeToggleBtn = document.getElementById("themeToggleBtn");
const clearBtn = document.getElementById("clearBtn");
const body = document.body;

// Function to apply the theme based on string value ('light' or 'dark')
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    themeToggleBtn.textContent = "Set Light Mode";
  } else {
    body.classList.remove("dark-mode");
    themeToggleBtn.textContent = "Set Dark Mode";
  }
}

// 1. Check Local Storage on page load
// If there's a saved theme, apply it. Otherwise, default to 'light'.
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// 2. Event Listener for the Theme Toggle button
themeToggleBtn.addEventListener("click", () => {
  // Check the current theme by seeing if the body has the 'dark-mode' class
  const isDarkMode = body.classList.contains("dark-mode");

  // Decide what the *new* theme should be
  const newTheme = isDarkMode ? "light" : "dark";

  // Apply the new theme visually
  applyTheme(newTheme);

  // Save the new theme to Local Storage
  localStorage.setItem("theme", newTheme);
});

// 3. Event Listener to Clear Local Storage
clearBtn.addEventListener("click", () => {
  // Clear everything out of localStorage
  localStorage.clear();

  // Revert UI to the default 'light' theme since storage is gone
  // (or you could choose to just leave current UI as is but clear storage)
  applyTheme("light");

  alert("Local Storage cleared! Theme reset to default.");
});
