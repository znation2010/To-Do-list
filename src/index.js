import './styles.css';
import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
  toggleDeleteIcon,
  toggleEditMode,
  clearCompletedTasks,
} from './app.js';

import { toggleStatus } from './status.js';

const todoList = document.getElementById('todo-list');

function renderTasks() {
  todoList.innerHTML = '';
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const taskRow = document.createElement('tr');
    taskRow.className = 'todo-item';
    taskRow.innerHTML = `
      <td>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
      </td>
      <td class="${task.completed ? 'completed' : ''}">
        ${
  task.showEdit
    ? `<input type="text" class="edit-input" value="${task.description}" />`
    : task.description
}
      </td>
    `;

    const checkbox = taskRow.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        toggleStatus(index); // Toggle task status
        renderTasks(); // Re-render tasks after updating status
      });
    }

    const kebabCell = document.createElement('td');
    kebabCell.className = 'kebab-icon';
    const kebabIcon = document.createElement('i');
    kebabIcon.className = `fas fa-ellipsis-v ${task.kebabClicked ? 'red' : ''}`;
    kebabCell.appendChild(kebabIcon);

    kebabIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleEditMode(index, !task.showEdit); // Toggle edit mode for the clicked task
      toggleDeleteIcon(index); // Toggle delete icon for the clicked task
      renderTasks();
    });

    // Add the delete icon when the delete button is toggled
    if (task.showDeleteIcon) {
      const deleteCell = document.createElement('td');
      deleteCell.className = 'delete-icon';
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fas fa-trash-alt';
      deleteCell.appendChild(deleteIcon);

      deleteIcon.addEventListener('click', () => {
        deleteTask(task.index); // Delete the task when delete icon is clicked
        renderTasks();
      });

      taskRow.appendChild(deleteCell);
    }

    taskRow.appendChild(kebabCell);
    todoList.appendChild(taskRow);

    // Add event listener to the edit input field
    const editInput = taskRow.querySelector('.edit-input');
    if (editInput) {
      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          editTask(index, editInput.value);
          toggleEditMode(index); // Exit edit mode after saving
          toggleDeleteIcon(index); // Toggle delete icon off
          renderTasks();
        }
      });
    }
  });
}

renderTasks();

const clearCompletedButton = document.getElementById('clearCompletedButton');
clearCompletedButton.addEventListener('click', () => {
  clearCompletedTasks();
  renderTasks();
});

const newTodoInput = document.getElementById('newTodo');
newTodoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newTaskDescription = newTodoInput.value.trim();
    if (newTaskDescription !== '') {
      addTask(newTaskDescription);
      newTodoInput.value = '';
      renderTasks();
    }
  }
});

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  const newTaskDescription = newTodoInput.value.trim();
  if (newTaskDescription !== '') {
    addTask(newTaskDescription);
    newTodoInput.value = '';
    renderTasks();
  }
});
