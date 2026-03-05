// --- Cookie Helper Functions ---

// Set a cookie with expiration in days
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Delete a cookie
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// --- DOM Elements ---
const loginSection = document.getElementById("loginSection");
const authSection = document.getElementById("authSection");
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const displayUsername = document.getElementById("displayUsername");
const preferenceSelect = document.getElementById("preferenceSelect");
const savePreferenceBtn = document.getElementById("savePreferenceBtn");
const feedContainer = document.getElementById("feedContainer");

// --- Application State & Logic ---

// Check login status on page load
function initializeApp() {
  const username = getCookie("username");

  if (username) {
    // User is logged in
    loginSection.classList.add("hidden");
    authSection.classList.remove("hidden");
    displayUsername.textContent = username;

    // Load preference if it exists
    const pref = getCookie("category_preference");
    if (pref) {
      preferenceSelect.value = pref;
    }

    loadFeed();
  } else {
    // User is NOT logged in
    loginSection.classList.remove("hidden");
    authSection.classList.add("hidden");
  }
}

// Login
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    // Store login cookie for 7 days
    setCookie("username", username, 7);
    usernameInput.value = "";
    initializeApp();
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  // Clear the cookies
  eraseCookie("username");
  eraseCookie("category_preference");

  // Reset UI
  preferenceSelect.value = "";
  feedContainer.innerHTML = "Loading...";

  initializeApp();
});

// Save Preference
savePreferenceBtn.addEventListener("click", () => {
  const pref = preferenceSelect.value;
  // Store preference cookie for 30 days
  setCookie("category_preference", pref, 30);
  alert("Preference saved!");
  loadFeed(); // Reload feed to apply new sorting
});

// Fetch data.json and render
async function loadFeed() {
  try {
    feedContainer.innerHTML = "Fetching data...";
    // Use cache-busting to ensure we always load the file
    const response = await fetch("data.json");
    let articles = await response.json();

    const pref = getCookie("category_preference");

    // Sort logic: if user has a preference, sort those to the top
    if (pref) {
      articles.sort((a, b) => {
        if (a.category === pref && b.category !== pref) return -1;
        if (a.category !== pref && b.category === pref) return 1;
        return 0; // maintain relative order for the rest
      });
    }

    renderFeed(articles, pref);
  } catch (error) {
    feedContainer.innerHTML = "Error loading feed: " + error.message;
  }
}

// Render the articles to the DOM
function renderFeed(articles, userPreference) {
  feedContainer.innerHTML = "";

  articles.forEach((article) => {
    const isRecommended = article.category === userPreference;

    const item = document.createElement("div");
    item.className = "article-item";

    item.innerHTML = `
      <div>
        ${isRecommended ? '<span class="recommended-badge">★ Recommended</span>' : ""}
        <span class="article-title">${article.title}</span>
      </div>
      <span class="article-badge">${article.category}</span>
    `;

    feedContainer.appendChild(item);
  });
}

// Start the app
initializeApp();
