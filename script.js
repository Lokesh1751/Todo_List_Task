const todoList = document.getElementById("list");
const inputField = document.getElementById("input");
const addButton = document.getElementById("btn");
const completedTasks = [];
const completedCounter = document.getElementById("completed");
const pendingCounter = document.getElementById("pending");
const clearButton = document.getElementById("clear");
const allTasks = document.getElementById("all");
const addMessage = document.getElementById("added");
const removedMessage = document.getElementById("removed");

let todos;

const updateCounters = () => {
  const completedCount = completedTasks.length;
  const pendingCount = todos.length - completedCount;
  completedCounter.innerText = `Completed ${completedCount}`;
  pendingCounter.innerText = `Pending ${pendingCount}`;
  allTasks.innerHTML = `All ${pendingCount + completedCount}`;
};

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  return data.slice(0, 10);
};

fetchData().then((data) => {
  todos = data.map((item) => item.title);
  todos.forEach((item) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const removeButton = document.createElement("span");
    removeButton.textContent = "remove";
    checkbox.type = "checkbox";
    listItem.textContent = item;
    listItem.insertBefore(checkbox, listItem.firstChild);
    listItem.appendChild(removeButton);
    listItem.className = "mytodo";
    checkbox.className = "checkbox";
    removeButton.className = "bin";

    todoList.appendChild(listItem);

    removeButton.addEventListener("click", () => {
      listItem.remove();
      todos = todos.filter((task) => task !== item);
      updateCounters();
      removedMessage.innerHTML = "Deleted Succesfully!";
      setTimeout(() => {
        removedMessage.innerHTML = "";
      }, 2000);
    });

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        listItem.style.textDecoration = "line-through";
        completedTasks.push(item);
      } else {
        listItem.style.textDecoration = "none";
        completedTasks.splice(completedTasks.indexOf(item), 1);
      }
      updateCounters();
    });
  });

  addButton.addEventListener("click", () => {
    const todo = inputField.value;
    if (todo === "") {
      alert("Enter Something!");
    } else {
      todos.push(todo);
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      const removeButton = document.createElement("span");
      removeButton.textContent = "remove";
      checkbox.type = "checkbox";
      listItem.textContent = todo;
      listItem.insertBefore(checkbox, listItem.firstChild);
      listItem.appendChild(removeButton);
      listItem.className = "mytodo";
      checkbox.className = "checkbox";
      removeButton.className = "bin";
      todoList.appendChild(listItem);
      addMessage.innerHTML = "Added Successfully!";
      setTimeout(() => {
        addMessage.innerHTML = "";
      }, 2000);
      updateCounters();

      removeButton.addEventListener("click", () => {
        listItem.remove();
        todos = todos.filter((task) => task !== todo);
        updateCounters();
        removed.innerHTML = "Deleted Succesfully!";
        setTimeout(() => {
          removed.innerHTML = "";
        }, 2000);
      });

      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          listItem.style.textDecoration = "line-through";
          completedTasks.push(todo);
        } else {
          listItem.style.textDecoration = "none";
          completedTasks.splice(completedTasks.indexOf(todo), 1);
        }
        updateCounters();
      });
      inputField.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    todos.length = 0;
    completedTasks.length = 0;
    todoList.innerHTML = "";
    updateCounters();
  });

  updateCounters();
});
