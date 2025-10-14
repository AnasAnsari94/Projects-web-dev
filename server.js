const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); // ✅ this must come BEFORE using app.use()
const PORT = 3000;

// Middleware
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Path to JSON “database”
const dbPath = path.join(__dirname, 'db.json');

// Read JSON helper
function readDB() {
  if (!fs.existsSync(dbPath)) return { tasks: [], notes: [] };
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// Write JSON helper
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Routes
app.get('/api/data', (req, res) => {
  const data = readDB();
  res.json(data);
});

app.post('/api/task', (req, res) => {
  const db = readDB();
  db.tasks.push(req.body);
  writeDB(db);
  res.json({ message: 'Task added successfully' });
});

app.delete('/api/task/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.filter(task => task.id !== req.params.id);
  writeDB(db);
  res.json({ message: 'Task deleted successfully' });
});

app.post('/api/note', (req, res) => {
  const db = readDB();
  db.notes.push(req.body);
  writeDB(db);
  res.json({ message: 'Note added successfully' });
});

app.delete('/api/note/:id', (req, res) => {
  const db = readDB();
  db.notes = db.notes.filter(note => note.id !== req.params.id);
  writeDB(db);
  res.json({ message: 'Note deleted successfully' });
});

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
