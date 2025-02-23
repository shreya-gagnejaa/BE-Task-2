const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to log request timestamps
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper function to read tasks from tasks.json
const readTasks = () => {
  const data = fs.readFileSync('tasks.json');
  return JSON.parse(data);
};

// Helper function to write tasks to tasks.json
const writeTasks = (tasks) => {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

// Route to get all tasks
app.get('/', (req, res) => {
  const tasks = readTasks();
  res.render('index', { tasks });
});

// Route to get a specific task by ID
app.get('/task', (req, res) => {
  const taskId = parseInt(req.query.id, 10);
  const tasks = readTasks();
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    res.render('task', { task });
  } else {
    res.status(404).send('Task not found');
  }
});

// Route to add a new task
app.post('/add-task', (req, res) => {
  const { title, description } = req.body;
  const tasks = readTasks();
  
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  writeTasks(tasks);
  res.redirect('/tasks');
});

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
