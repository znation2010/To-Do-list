let tasks = [];

// Load tasks from local storage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
    showDeleteIcon: false,
    showEdit: false,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
}

function updateIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  saveTasksToLocalStorage();
}

export function deleteTask(index) {
  tasks = tasks.filter((task) => task.index !== index);
  updateIndexes();
  saveTasksToLocalStorage();
}

export function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasksToLocalStorage();
}

export function getTasks() {
  return tasks;
}

export function toggleDeleteIcon(index) {
  if (tasks[index] && Object.prototype.hasOwnProperty.call(tasks[index], 'showDeleteIcon')) {
    tasks[index].showDeleteIcon = !tasks[index].showDeleteIcon;
    saveTasksToLocalStorage();
  }
}

export function toggleEditMode(index, editMode = false) {
  tasks.forEach((task, i) => {
    task.showEdit = i === index && editMode;
  });
  saveTasksToLocalStorage();
}

export function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
}

export { saveTasksToLocalStorage };
