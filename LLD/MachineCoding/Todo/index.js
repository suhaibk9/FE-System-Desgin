document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoSubmit = document.querySelector(".todo-submit");
  let editMode = false;
  let editItem = null;
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      if (editMode) {
        editItem.firstElementChild.textContent = todoInput.value;
        editMode.firstElementChild = todoSubmit.textContent = "Add Todo";
        todoInput.value = "";
      } else {
        addTodo(todoText);
      }
    } else {
      alert("Please add a Todo");
      return;
    }
  });
  todoList.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "BUTTON") {
      const todoItem = target.parentElement;
      if (target.textContent === "Edit") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.textContent = "Edit Todo";
        todoInput.focus();
        todoInput.value = todoItem.firstElementChild.textContent;
      } else if (target.textContent === "Delete") todoItem.remove();
    }
  });
  const addTodo = (todoText) => {
    const li = document.createElement("li");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    li.innerHTML = `<span>${todoText}</span>`;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    li.append(editBtn, deleteBtn);
    todoList.prepend(li);
    todoInput.value = "";
  };
});
