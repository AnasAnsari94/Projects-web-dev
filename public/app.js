// DOM Elements
const taskList = document.getElementById("taskList");
const noteList = document.getElementById("noteList");
const addTaskBtn = document.getElementById("addTaskBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const themeToggle = document.getElementById("themeToggle");

// Load data on startup
window.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
  const res = await fetch("/api/data");
  const data = await res.json();
  renderTasks(data.tasks);
  renderNotes(data.notes);
}

// Render tasks
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="task-card">
        <div>
          <strong>${task.title}</strong><br>
          <small>${task.date} ${task.time}</small>
        </div>
        <button class="delete-btn" onclick="deleteTask('${task.id}')">×</button>
      </div>`;
    taskList.appendChild(li);
  });
}

// Render notes
function renderNotes(notes) {
  noteList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="note-card">
        <p>${note.content}</p>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">×</button>
      </div>`;
    noteList.appendChild(li);
  });
}

// Add Task
addTaskBtn.addEventListener("click", async () => {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  if (!title || !date || !time) return alert("Fill all fields!");

  await fetch("/api/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Date.now().toString(),
      title,
      date,
      time,
    }),
  });

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";

  loadData();
});

// Delete Task
async function deleteTask(id) {
  await fetch(`/api/task/${id}`, { method: "DELETE" });
  loadData();
}

// Add Note
addNoteBtn.addEventListener("click", async () => {
  const content = document.getElementById("noteContent").value.trim();
  if (!content) return alert("Note cannot be empty!");

  await fetch("/api/note", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Date.now().toString(), content }),
  });

  document.getElementById("noteContent").value = "";
  loadData();
});

// Delete Note
async function deleteNote(id) {
  await fetch(`/api/note/${id}`, { method: "DELETE" });
  loadData();
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
