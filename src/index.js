import './styles.css';

let tasks = [ // Use 'let' instead of 'const' here
  { description: 'Hicking', completed: false, index: 1 },
  { description: 'Gym', completed: false, index: 2 },
  { description: 'Study', completed: false, index: 3 },
];

const todoList = document.getElementById('todo-list');

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const taskRow = document.createElement('tr');
    taskRow.className = 'todo-item';
    taskRow.innerHTML = `
      <td>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
      </td>
      <td class="${task.completed ? 'completed' : ''}">
        ${task.description}
      </td>
    `;

    const kebabCell = document.createElement('td');
    kebabCell.className = 'kebab-icon';
    const kebabIcon = document.createElement('i');
    kebabIcon.className = 'fas fa-ellipsis-v';
    kebabCell.appendChild(kebabIcon);

    taskRow.appendChild(kebabCell);

    todoList.appendChild(taskRow);
  });
}

renderTasks();

// Event listener for "Enter" key in input field
const newTodoInput = document.getElementById('newTodo');
newTodoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newTaskDescription = newTodoInput.value.trim();
    if (newTaskDescription !== '') {
      tasks.push({
        description: newTaskDescription,
        completed: false,
        index: tasks.length + 1,
      });
      newTodoInput.value = '';
      renderTasks();
    }
  }
});

// Event listener for add button click
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  const newTaskDescription = newTodoInput.value.trim();
  if (newTaskDescription !== '') {
    tasks.push({
      description: newTaskDescription,
      completed: false,
      index: tasks.length + 1,
    });
    newTodoInput.value = '';
    renderTasks();
  }
});

const clearCompletedButton = document.getElementById('clearCompletedButton');
clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});
