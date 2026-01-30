const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.className = "task-card" + (task.done ? " done" : "");
        card.innerHTML = `
            <span>${task.text}</span>
            <div class="time-badge">${task.time}</div>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("delete-btn")) toggleTask(index);
        });
        taskList.appendChild(card);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const now = new Date();
        const timeString = now.toLocaleDateString() + " " + now.toLocaleTimeString();
        tasks.push({ text, done: false, time: timeString });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

renderTasks();
