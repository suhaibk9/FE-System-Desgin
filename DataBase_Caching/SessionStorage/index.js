const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");

const STORAGE_KEY = "session_todos";

// 1. Initialize: Load todos from sessionStorage on page load
let todos = [];
const savedTodos = sessionStorage.getItem(STORAGE_KEY);
if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

// Render initial list
renderTodos();

// 2. Add Todo Logic
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return; // Prevent empty todos

  // Create new todo object
  const newTodo = {
    id: Date.now().toString(), // poor man's unique ID
    text: text,
  };

  // Add to array
  todos.push(newTodo);

  // Save back to session storage
  saveToSessionStorage();

  // Re-render UI
  renderTodos();

  // Clear input
  todoInput.value = "";
  todoInput.focus();
}

// 3. Remove Todo Logic
function removeTodo(idToRemove) {
  // Filter out the one we want to remove
  todos = todos.filter((todo) => todo.id !== idToRemove);

  // Update session storage
  saveToSessionStorage();

  // Re-render
  renderTodos();
}

// 4. Helper: Save current state to SessionStorage
function saveToSessionStorage() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 5. Helper: Render the list to the DOM
function renderTodos() {
  // Clear the current list
  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";

    // Create DOM elements for each todo
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      const btn = document.createElement("button");
      btn.className = "remove-btn";
      btn.textContent = "Remove";
      btn.addEventListener("click", () => removeTodo(todo.id));

      li.appendChild(span);
      li.appendChild(btn);

      todoList.appendChild(li);
    });
  }
}
