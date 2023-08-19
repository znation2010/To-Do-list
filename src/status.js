import { saveTasksToLocalStorage, getTasks } from './app.js';

function modifyStatus(index, completed = null) {
  const tasks = getTasks();
  if (tasks[index]) {
    tasks[index].completed = completed !== null ? completed : !tasks[index].completed;
    saveTasksToLocalStorage();
  }
}

export function updateStatus(index, completed) {
  modifyStatus(index, completed);
}

export function toggleStatus(index) {
  modifyStatus(index);
}
