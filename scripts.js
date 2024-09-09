// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    const li = document.createElement("li");

    li.innerHTML = `${taskInput.value}
            <button class="done-btn" onclick="markDone(this)">✔</button>
            <button class="remove-btn" onclick="removeTask(this)">✖</button>`;

    taskList.appendChild(li);
    saveTasks(); // Save tasks to local storage
    taskInput.value = "";
  }
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks(); // Save tasks to local storage after removal
}

function markDone(button) {
  const li = button.parentElement;
  li.classList.toggle("crossed");
  saveTasks(); // Save tasks to local storage after marking done
}

function resetTasks() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks"); // Clear tasks from local storage
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      done: li.classList.contains("crossed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  storedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.text}
            <button class="done-btn" onclick="markDone(this)">✔</button>
            <button class="remove-btn" onclick="removeTask(this)">✖</button>`;
    if (task.done) li.classList.add("crossed");
    taskList.appendChild(li);
  });
}

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) =>
      console.error("Service Worker Registration Failed:", error)
    );
}
